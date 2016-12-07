"""
Pack everything up and deploy it to S3.
"""

from s3 import deploy_to_bucket
import shutil
import os

with open('VERSION', 'r') as f:
    version = f.read()

data = {}

data['version'] = input("Version number (last was {}): ".format(version))
data['environment'] = 'prod'

with open('VERSION', 'w') as f:
    f.write(data['version'])

path = "/Users/m/litany_builds/morse/"

if not os.path.isdir(path):
    os.makedirs(path)

shutil.copytree('src', path+"v"+data['version']+'/')

deploy_to_bucket(path+"v"+data['version']+'/', 'morse.litany.io')
