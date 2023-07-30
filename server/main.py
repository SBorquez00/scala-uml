from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import os
import zipfile

try:
    import zlib
    compression = zipfile.ZIP_DEFLATED
except:
    compression = zipfile.ZIP_STORED

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
def create_uml_diagram(diagrams: list[UMLDiagram]):
    zip_path = "outputs/"+diagrams[0].className+".zip"
    zf = zipfile.ZipFile(zip_path, mode="w")
    for diagram in diagrams:
        name = diagram.className
        output = "outputs/"+name+".txt"
        if os.path.exists(output):
            os.remove(output)
        with open(output, "w") as f:
            f.write(f"class {name}(){'{'}\n")
            if diagram.methods is not None:
                for method in diagram.methods:
                    f.write(f"\tdef {method}(){'{'}\n")
                    f.write(f"\t\t\n")
                    f.write(f"\t{'}'}\n")
            f.write(f"{'}'}\n")
        zf.write(output, compress_type=compression)
    zf.close()
    return FileResponse(zip_path)

@app.get("/{name}")
def download_class(name: str):
    output = "outputs/"+name+".zip"
    return FileResponse(output)