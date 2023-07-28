from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os

class UMLDiagram(BaseModel):
    className: str
    methods: list[str] | None = None


app = FastAPI()

origins = ["http://127.0.0.1:5173",
           "http://localhost"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/uml")
def create_uml_diagram(diagram: UMLDiagram):
    name = diagram.className
    output = "outputs/"+name+".txt"
    if os.path.exists(output):
        os.remove(output)
    with open(output, "w") as f:
        f.write(f"class {name}(){'{'}\n")
        for method in diagram.methods:
            f.write(f"\tdef {method}(){'{'}\n")
            f.write(f"\t\t\n")
            f.write(f"\t{'}'}\n")
        f.write(f"{'}'}\n")
    return FileResponse(output)

@app.get("/{name}")
def download_class(name: str):
    output = "outputs/"+name+".zip"
    return FileResponse(output)