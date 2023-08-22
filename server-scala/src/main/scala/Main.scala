object Main extends cask.MainRoutes {
  @cask.get("/")
  def hello(): String = {
    "Hello World!"
  }

  initialize()
}
