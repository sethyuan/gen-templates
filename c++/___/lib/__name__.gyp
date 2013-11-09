{
  "variables": {
    "target_arch%": "ia32",
    "library%": "static_library",
  },
  "target_defaults": {
    "default_configuration": "Release",
    "cflags": ["-std=c++11", "-Wall", "-Wextra"],
    "xcode_settings": {
      "CLANG_CXX_LANGUAGE_STANDARD": "c++11",
      "CLANG_CXX_LIBRARY": "libc++",
      "WARNING_CFLAGS": ["-Wall", "-Wextra"],
      "OTHER_LDFLAGS": ["-stdlib=libc++"],
    },
    "msvs_settings": {
      "VCCLCompilerTool": {
        "WarningLevel": 4,
      },
    },
    "conditions": [
      ["target_arch=='ia32'", {
        "cflags": ["-m32"],
        "ldflags": ["-m32"],
        "xcode_settings": {"ARCHS": ["i386"]},
        "msvs_settings": {
          "VCLinkerTool": {
            "TargetMachine": 1,
          },
        },
      }],
      ["target_arch=='x64'", {
        "cflags": ["-m64"],
        "ldflags": ["-m64"],
        "xcode_settings": {"ARCHS": ["x86_64"]},
        "msvs_settings": {
          "VCLinkerTool": {
            "TargetMachine": 17,
          },
        },
      }]
    ],
    "configurations": {
      "Debug": {
        "cflags": ["-g", "-O0"],
        "xcode_settings": {
          "GCC_OPTIMIZATION_LEVEL": "0",
        },
        "msvs_settings": {
          "VCCLCompilerTool": {
            "Optimization": 0,
          },
        },
      },
      "Release": {
        "defines": ["NDEBUG"],
        "cflags": ["-O3"],
        "xcode_settings": {
          "GCC_OPTIMIZATION_LEVEL": "s",
        },
        "msvs_settings": {
          "VCCLCompilerTool": {
            "Optimization": 3,
            "FavorSizeOrSpeed": 1, # favor speed
          },
        },
      }
    }
  },
  "targets": [
    {
      "target_name": "{{{name}}}",
      "type": "<(library)",
      "defines": [],
      "include_dirs": [],
      "dependencies": [],
      "link_settings": {
        "libraries": [],
      },
      "direct_dependent_settings": [],
      "export_dependent_settings": [],
      "sources": [
        "{{{name}}}.cpp",
        # header files
        "{{{name}}}.h",
      ],
      "target_conditions": [
        ["_type=='shared_library'", {
          "cflags": ["-fPIC"],
          "xcode_settings": {
            "INSTALL_PATH": "@rpath",
            "GCC_DYNAMIC_NO_PIC": "NO",
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
