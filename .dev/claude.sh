#/bin/bash
mkdir -p .dev/.home
podman build .dev/ --tag claude
podman run \
  -ti \
  --env-file=$HOME/.claude.env \
  -e ANTHROPIC_AUTH_TOKEN=test \
  -v .dev/.home:/root:z \
  -v .:/repo:z \
  claude
