#!/bin/bash
exec > /var/log/jenkins-setup.log 2>&1
set -x

# Install Docker and AWS CLI on HOST
apt-get update -y
apt-get install -y docker.io git unzip curl awscli

systemctl start docker
systemctl enable docker
chmod 666 /var/run/docker.sock

# Run Jenkins
docker run -d \
  --name jenkins \
  --restart=always \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/bin/docker:/usr/bin/docker \
  jenkins/jenkins:lts

# Install AWS CLI v2 standalone inside container
sleep 15
docker exec -u root jenkins bash -c "
  apt-get update && \
  apt-get install -y curl unzip git && \
  curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o '/tmp/awscliv2.zip' && \
  cd /tmp && unzip -q awscliv2.zip && ./aws/install && \
  rm -rf /tmp/aws /tmp/awscliv2.zip
"

echo "Jenkins setup complete!"
