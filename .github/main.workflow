workflow "New workflow" {
  on = "push"
  resolves = ["Build Container"]
}

action "Build Container" {
  uses = "./docker"
}
