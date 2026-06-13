from fastapi import FastAPI

app = FastAPI(title="BiteNow API")

@app.get("/")
def read_root():
    return {"message": "Welcome to BiteNow Backend Service"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
