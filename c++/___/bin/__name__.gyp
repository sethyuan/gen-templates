{
  "variables": {
    "target_arch%": "ia32",
  },
  "target_defaults": {
    "default_configuration": "Release",
    "cflags": ["-std=c++11", "-Wall", "-Wextra"],
    "xcode_settings": {
      "CLANG_CXX_LANGUAGE_STANDARD": "c++11",
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
      "type": "executable",
      "include_dirs": [],
      "libraries": [],
      "defines": [],
      "dependencies": [],
      "sources": [
        "{{{name}}}.cc",
      ],
      "xcode_settings": {
        "GCC_PREFIX_HEADER": "{{{name}}}_prefix.h",
        "GCC_PRECOMPILE_PREFIX_HEADER": "YES",
        "LD_RUNPATH_SEARCH_PATHS": ["@loader_path/"],
      },
      "conditions": [
        ["OS!='mac' and OS!='win'", {
          "link_settings": {
            "ldflags": ["-Wl,-rpath=\$$ORIGIN/"],
          },
        }],
      ],
    }
  ],
  "conditions": [
    ["OS=='mac'", {
      "make_global_settings": [
        ["CC", "/usr/bin/clang"],
        ["CC.host", "/usr/bin/clang"],
        ["CXX", "/usr/bin/clang++"],
        ["CXX.host", "/usr/bin/clang++"],
      ],
    }],
  ],
}
