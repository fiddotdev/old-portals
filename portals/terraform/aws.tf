provider "aws" {
  region = "us-west-2"
}

data "aws_ssm_parameter" "ubuntu" {
  name = "/aws/service/canonical/ubuntu/server/20.04/stable/current/amd64/hvm/ebs-gp2/ami-id"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "main" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  vpc_id = aws_vpc.main.id
}

resource "aws_instance" "TestnetHubble" {
  ami           = data.aws_ssm_parameter.ubuntu.value
  instance_type = "m5.large"
  subnet_id     = aws_subnet.main.id
  vpc_security_group_ids = [aws_security_group.allow_ssh.id]
  key_name               = "Hubble"

  tags = {
    Name = "TestnetHubble"
  }
}

// For Elastic Beanstalk
// We spin these up via the CLI in the respective projects (via eb create)
// Creating them in Terraform I believe makes 0 sense since they don't have anything associated w/ them