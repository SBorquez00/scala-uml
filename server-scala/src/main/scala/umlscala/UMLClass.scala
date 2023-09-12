package umlscala

class UMLClass(val name: String, val methods: List[String]) {

  def print(): Unit = {
    println(s"Nombre: ${name} \n Metodos:${methods.mkString("\n")}")
  }

  def makeClass(): String = {
      val header = s"class ${name}() {\n"
      val methodsStruct: List[String] = methods.map(method => s"\ndef ${method} = {\n???\n}")
      header + methodsStruct.mkString
  }
}
