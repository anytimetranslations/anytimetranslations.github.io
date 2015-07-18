#!/bin/bash

# This will sync all the files to the s3 bucket hosting the website
# and schedule invalidation of all /*.html files with cloudfront
#
# This may take 15 minutes to take effect

aws --profile anytime s3 sync . s3://anytimetraducoes.com.br --exclude ".git/*" --exclude "bin/*" --exclude "source.json"
aws --profile anytime cloudfront create-invalidation --cli-input-json file://source.json
