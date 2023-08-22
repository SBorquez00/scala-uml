ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "2.13.11"

lazy val root = (project in file("."))
  .settings(
    name := "server-scala"
  )

libraryDependencies += "com.lihaoyi" %% "cask" % "0.9.1"
