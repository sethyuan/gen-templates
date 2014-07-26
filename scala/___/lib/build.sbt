name := "{{{name}}}"

organization := "cav"

description := "{{{desc}}}"

version := "0.1.0"

licenses := Seq(("MIT" -> url("http://mit-license.org")))

homepage := Some(url("https://github.com/sethyuan/{{{name}}}"))

scalaVersion := "2.10.4"

crossScalaVersions := Seq("2.10.4", "2.11.1")

resolvers ++= Seq(
  "Sonatype Snapshots" at "http://oss.sonatype.org/content/repositories/snapshots",
  "Sonatype Releases" at "http://oss.sonatype.org/content/repositories/releases"
)

// libraryDependencies ++= Seq()

scalacOptions ++= Seq("-target:jvm-1.7", "-optimize", "-deprecation", "-feature", "-Xlint", "-Xlog-reflective-calls")
