{
  "variables": {
    "target_arch%": "ia32",
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
      },
    },
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
        "src/{{{name}}}.cpp",
      ],
      "conditions": [
        ["OS=='mac'", {
          "xcode_settings": {
            "LD_RUNPATH_SEARCH_PATHS": ["@loader_path/"],
          },
        }],
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
