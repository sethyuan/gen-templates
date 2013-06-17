{
#  "make_global_settings": [
#    ["CC", "/usr/bin/clang"],
#    ["CC.host", "/usr/bin/clang"],
#    ["CXX", "/usr/bin/clang++"],
#    ["CXX.host", "/usr/bin/clang++"],
#  ],
  "variables": {
    "target_arch%": "ia32",
    "library%": "static_library",
  },
  "target_defaults": {
    "default_configuration": "Release",
    "cflags": ["-std=c++98", "-Wall", "-Wextra"],
    "xcode_settings": {
      "CLANG_CXX_LANGUAGE_STANDARD": "c++98",
      "WARNING_CFLAGS": ["-Wall", "-Wextra"],
    },
    "conditions": [
      ["target_arch=='ia32'", {
        "cflags": ["-m32"],
        "ldflags": ["-m32"],
        "xcode_settings": {"ARCHS": ["i386"]}
      }],
      ["target_arch=='x64'", {
        "cflags": ["-m64"],
        "ldflags": ["-m64"],
        "xcode_settings": {"ARCHS": ["x86_64"]}
      }]
    ],
    "configurations": {
      "Debug": {
        "cflags": ["-g", "-O0"],
        "defines": ["DEBUG"],
        "xcode_settings": {
          "GCC_OPTIMIZATION_LEVEL": "0",
        },
      },
      "Release": {
        "cflags": ["-O3"],
        "defines": ["NDEBUG"],
        "xcode_settings": {
          "GCC_OPTIMIZATION_LEVEL": "s",
        },
      }
    }
  },
  "targets": [
    {
      "target_name": "{{{name}}}",
      "type": "<(library)",
      "include_dirs": [],
      "libraries": [],
      "defines": [],
      "dependencies": [],
      "direct_dependent_settings": [],
      "export_dependent_settings": [],
      "sources": [
        "{{{name}}}.cc",
        # header files
        "{{{name}}}.h",
      ],
      "xcode_settings": {
        "GCC_PREFIX_HEADER": "{{{prefix}}}_prefix.h",
        "GCC_PRECOMPILE_PREFIX_HEADER": "YES",
      },
      "conditions": [
        ["_type=='shared_library'", {
          "xcode_settings": {
            "INSTALL_PATH": "@rpath",
          },
        }],
      ],
    }
  ]
}
