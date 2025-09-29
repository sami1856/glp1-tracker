from fastapi import FastAPI

app = FastAPI(title="GLP-1 Tracker API")

@app.get("/")
def root():
    return {"status": "ok", "app": "glp1-tracker"}

@app.get("/health")
def health():
    return {"healthy": True}
