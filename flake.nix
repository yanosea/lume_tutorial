{
  description = "yanosea/lume_tutorial devShells";
  inputs = {
    # nixpkgs
    nixpkgs = {
      url = "github:NixOS/nixpkgs/nixos-unstable";
    };
    # modules
    ## flake-parts
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
    };
    ## systems
    systems = {
      url = "github:nix-systems/default";
    };
  };
  outputs =
    inputs@{
      nixpkgs,
      flake-parts,
      systems,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = import inputs.systems;
      perSystem =
        { pkgs, ... }:
        {
          # devShells
          devShells.default = pkgs.mkShell {
            packages = with pkgs; [
              deno
              stdenv.cc.cc
              vips
            ];
            LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
              pkgs.stdenv.cc.cc
              pkgs.vips
            ];
          };
        };
    };
}
