#!/bin/bash

# Run turbo prune with specific filter
turbo prune --scope=horizon --docker

# Change directory into 'out'
cd out

# Check if destination directories exist and move files
if [ -d "full/portals/horizon" ]; then
    mv full/portals/horizon/Dockerfile .
    mv full/portals/horizon/.dockerignore .
    mv full/portals/horizon/.elasticbeanstalk .
else
    echo "Directory full/portals/horizon does not exist"
    exit 1
fi

# Store current timestamp in a variable
current_timestamp=$(date +%s)

# Create a new docker build with current timestamp as a tag
docker build -t horizon:"$current_timestamp" .
# Prompt the user if they'd like to deploy to EBS
read -p "Would you like to deploy to EBS? (yes/no): " answer

# Check the answer
if [ "$answer" != "yes" ]; then
    echo "Exiting without deploying to EBS."
    exit 1
fi

echo "Which Environment?"
eb list

# Ask user for the environment to use
read -p "Input environment from the list above: " env

eb use "$env"
echo "----------------------------"
echo "Despite what the EB CLI says, please *do not* exit this. Viewing these logs and monitoring them is important"
echo "----------------------------"
eb deploy

echo "Deployment Successful, starting cleanup"
cd ..
rm -rf out/
echo "Done."