cmake_minimum_required(VERSION 2.8)

set(CMAKE_C_FLAGS "-std=c99 -Wall -Wextra -pedantic -O0 -g" CACHE STRING "Flags for all build types.")
set(CMAKE_CXX_FLAGS "-std=c++98 -Wall -Wextra -pedantic -O0 -g" CACHE STRING "Flags for all build types.")
set(proj_name "{{{name}}}")

project(${proj_name})

if(APPLE)
  set(CMAKE_EXE_LINKER_FLAGS "-Wl,-rpath,@loader_path/lib")
  set(CMAKE_INSTALL_NAME_DIR "@rpath")
elseif(UNIX)
  set(CMAKE_EXE_LINKER_FLAGS "-Wl,-rpath,$ORIGIN/lib")
  set(CMAKE_INSTALL_NAME_DIR "")
endif()

set(src "{{{name}}}.c")

add_executable(${proj_name} ${src})
