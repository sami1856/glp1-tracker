# 🔧 Elisence – Phase 7 Technical Summary (Voice Navigation V2)
# Engineering Architecture, Debugging Guide, and Roadmap
# Version: 2025-11 — Prepared for Elisence Global Engineering Teams

============================================================
1) Overview – What Phase 7 Actually Delivers
============================================================

Phase 7 introduces Elisence’s first full-scale **Voice Navigation Engine**:
A standalone, multilingual, intent-based microservice that allows users to 
navigate the entire Elisence ecosystem using natural speech.

This system:
- Understands user intent (navigation, actions, health commands)
- Supports 5 languages (EN/FA/AR/TR/RO)
- Maintains multi-turn memory (context engine)
- Generates structured JSON plans for health actions
- Works independently from UI, Phase 4 backend, or other microservices
- Returns consistent “V2 Standard JSON Output” for universal compatibility
- Is fully ready for integration into Phase 8 (Voice STT + Voice UX)

The architecture is stable, modular, and future-proof.


============================================================
2) Directory Structure (Final, Clean)
============================================================

phase7_voice_nav_v2/
    ├── router_v2.py
    ├── main_phase7_voice_nav_v2_main.py
    ├── phrases_en_v2.py
    ├── phrases_fa_v2.py
    ├── phrases_ar_v2.py
    ├── phrases_tr_v2.py
    ├── phrases_ro_v2.py
    ├── tests/
    │     ├── test_voice_nav_phrases_v2.py
    │     └── __init__.py
    └── __init__.py

This is a clean, production-ready structure where:
- router_v2.py = main logic (APIRouter + handlers)
- phrases_*.py = language phrase dictionaries
- tests/ = automated unit tests for phrase → intent mapping


============================================================
3) Key Internal Components
============================================================

------------------------------------------------------------
3.1 Intent Engine
------------------------------------------------------------
Maps user speech → internal “intent key”.

Examples:
    go_home
    go_settings
    go_my_profile
    go_family_section
    go_women_health

Each intent has:
- phrase triggers (in 5 languages)
- route mapping
- category (navigation, action, health)

------------------------------------------------------------
3.2 Navigation Engine
------------------------------------------------------------
Uses INTENT_TARGETS_V2:

    "go_home"         → "/home"
    "go_settings"     → "/settings"
    "go_my_profile"   → "/profile"

Outputs a “navigation plan” in the standard JSON format.

------------------------------------------------------------
3.3 Page Action Engine
------------------------------------------------------------
Actions such as:
    scroll_down
    scroll_up
    open_tab_2
    open_menu

Mapped through PAGE_ACTIONS_V2.

------------------------------------------------------------
3.4 Health Action Planner (Phase 6 Bridge)
------------------------------------------------------------
Entry point:
    POST /v7/voice-nav/health/plan

Validations handled through Pydantic:
- missing value
- invalid action
- numeric requirements

Output includes:
- target_phase
- semantic meaning
- unit normalization
- requires_value flag

This isolates Phase 7 from Phase 4/5/6 code. 


============================================================
4) Multi-Turn Context Engine
============================================================

Voice navigation remembers:
- last_intent
- last_action
- current_section

Stored in:
    VOICE_CONTEXT_STORE (dict)

Endpoints:
    GET  /context/{id}
    POST /context/update
    POST /context/clear
    POST /followup

Supported followups:
    back
    repeat_last
    continue
    save

This enables natural conversation flow.


============================================================
5) Hints / Tutorials Engine
============================================================

Endpoints:
    GET /hints
    GET /hints/{lang}

Provides:
- example utterances
- example intents
- structured sections
- used by frontend to teach users “You can say…”

All 5 languages supported.


============================================================
6) Standard JSON Output Layer (Critical Backbone)
============================================================

All outputs—navigation, actions, health, followup—are standardized:

{
  "version": "v2",
  "type": "navigation/action/health/followup",
  "intent": "...",
  "target_route": "...",
  "ui_action": "...",
  "plan": {...},
  "context": {...}
}

This ensures:
- stable UI integration
- safe merges with Phase 4/5/6
- future-proof extensibility


============================================================
7) Pydantic Models Used (Validation Layer)
============================================================

Models:
- VoiceNavCommand
- VoiceActionCommand
- VoiceHealthCommand
- VoiceFollowUp

All models validate:
- session_id
- intent / action / followup_kind
- numeric values if required

Invalid inputs return 422 + error details.


============================================================
8) Error Handling – Full List
============================================================

------------------------------------------------------------
❌ Unknown Health Action:
------------------------------------------------------------
{
  "status": "unknown_action",
  "known_actions": [...]
}

------------------------------------------------------------
❌ Missing numeric value:
------------------------------------------------------------
{
  "status": "missing_value",
  "meta": {
     "semantic": "...",
     "default_unit": "kg"
  }
}

------------------------------------------------------------
❌ Unknown followup:
------------------------------------------------------------
Fallback intent = "unknown_followup"

------------------------------------------------------------
❌ Invalid route / router not defined:
------------------------------------------------------------
Occurs when APIRouter is defined below decorators — fixed in this version.

------------------------------------------------------------
❌ Port Conflict (Error 48)
------------------------------------------------------------
Cause: leftover uvicorn process.

Fix:

lsof -i :8951  
kill -9 <PID>


============================================================
9) How to Run the Service (Clean Commands)
============================================================

Activate venv:
    source venv/bin/activate

Compile:
    python3 -m py_compile phase7_voice_nav_v2/router_v2.py

Run server:
    uvicorn phase7_voice_nav_v2.main_phase7_voice_nav_v2_main:app \
        --host 127.0.0.1 --port 8951

Test:
    curl 127.0.0.1:8951/v7/voice-nav/intents
    curl 127.0.0.1:8951/v7/voice-nav/hints?lang=en


============================================================
10) Backup Standard (Saami & Elisa Protocol)
============================================================

mkdir -p backups  
zip -r backups/phase7_voice_nav_v2_$(date +"%Y-%m-%d_%H-%M-%S").zip phase7_voice_nav_v2

All backups stored in:
Desktop/Phase7_voice/backups


============================================================
11) Completed Engineering Checklist
============================================================

✓ Intent Engine V2  
✓ Multi-language phrase system  
✓ Language fallback to English  
✓ Navigation Engine  
✓ Page Actions Engine  
✓ Health Action Planner (Phase 6 bridge)  
✓ Context Engine  
✓ Followup Engine  
✓ Hints & Tutorial module  
✓ Standard JSON Output layer  
✓ Swagger full green  
✓ py_compile successful  
✓ All endpoints passing manual tests  
✓ Backup automation working  
✓ Folder structure stabilized  
✓ Ready for Phase 8 integration  


============================================================
12) Phase 8 Readiness
============================================================

Phase 7 has been explicitly designed to plug into Phase 8:

- STT engine can feed text directly into the same models.
- Intent Engine can be extended to embeddings / semantic search.
- Navigation + context already supports continuous conversation.
- UI expects V2 standard JSON → backward compatible.
- Adding new intents requires *zero* structural changes.
- Health actions already support structured plans.


============================================================
13) Troubleshooting Map
============================================================

If something breaks, check in this order:

1) Does the server run?
   - If not → port conflict or missing import

2) Does /intents return?
   - If not → INTENT_TARGETS_V2 malformed

3) Does /hints return?
   - If not → language JSON error in phrases file

4) Does /health/plan work?
   - If not → HEALTH_ACTIONS_V2 definition issue

5) Do followups work?
   - If not → context store not updated properly

6) Does Swagger open?
   - If not → router not included or import path wrong

7) Is py_compile failing?
   - Indentation or missing colon

This map allows *any engineer* to fix the system without guesswork.


============================================================
14) Final Engineering Summary
============================================================

Phase 7 is a complete, modern, modular, and production-grade Voice Navigation microservice.

It provides:
- Human-level usability
- Accessibility for women, elders, kids
- Multilingual coverage from day one
- Cross-phase routing
- Unified output structure
- Full testability
- Zero dependency on UI or main backend
- Clean expansion toward Phase 8 (Voice/Video AI)

Any engineering team—UK, EU, US, Gulf—can onboard in less than 15 minutes using this document.

Phase 7 is **fully complete** and Elisence is now ready for Phase 8.