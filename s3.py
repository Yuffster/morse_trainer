import os
import boto3
import mimetypes

def deploy_to_bucket(path, bucket_name):
    s3 = boto3.resource('s3')
    bucket = s3.Bucket(bucket_name)
    for root,dirs,files in os.walk(path):
        for file in files:
            if (file[0]=="." or "scratch" in file):
                continue
            content_type = mimetypes.guess_type(file)[0]
            args = {
                'ContentType': content_type,
                'ACL': 'public-read'
            }
            local_path = os.path.join(root, file)
            key_path = local_path.replace(path, '')
            print(local_path, '=>', key_path, content_type)
            f = bucket.upload_file(local_path, key_path, args)
    bucket.Acl().put(ACL='public-read')
