package umlscala

class UMLClass(val name: String, val methods: List[String]) {

  def print(): Unit = {
    println(s"Nombre: ${name} \n Metodos:${methods.mkString("\n")}")
  }

  def makeClass(): String = {
      val header = s"class ${name}() {"
      val methodsStruct: List[String] = methods.map(method => s"\n  def ${method} = {\n    ???\n  }")
      header + methodsStruct.mkString + "\n}"
  }
}
