---
layout: post
title: "My own url shortener"
subtitle: "How hard can it be?"
summary: "When wanting to share some urls with proper utm tags, I encounter that the URL is ugly and long. So why not host my own URL shortener. How hard can it be?"
lang: en
image: /assets/images/2022-11-26/url-shortener-preview.png
categories:
  - cloud
---

# The problem
At some point every one is going to need to share a link. It can be on a post, a profile link or a link with utm so that you can track your campaings. For instance, if you'd like to share a link with utm data, you could use the site [Campaign URL Builder](https://ga-dev-tools.web.app/campaign-url-builder/), this URL can get very long very fast. When using the site and setting all the fields, we can go from a simple URL like `https://www.example.com` to `https://www.example.com/?utm_source=linkedin&utm_medium=referral&utm_campaign=promote_post&utm_id=myexamplecampaign&utm_term=cloud&utm_content=post`, the length of the URL grows 7 times by just adding metadata so that you can measure your campaign performance.

# TL;DR
If you have access to an AWS account and do need fancy features that providers offer, you can create your own url shoretener by using AWS resources easily enough. You can take look to the [gist](https://gist.github.com/jaxkodex/85f62cc69c824aea33cf77949472f88c) for an example of the resouces used.

# The solution
At this point I am just gonna create a small service that satifies the following requirements:

1. I can use my own domain
2. I can set the link resource
3. It will redirect using HTTP code 301 Moved Permanently
4. I'll try to code as little as possible
5. I do not want to maintain a server

Points 1-3 are pretty standar, and if I'd like to use a service like bit.ly, I'd have to pay around 29 USD monthly, of course the service gives a lot of other features for that price, but at this point I am not interested on all those other features. Reference: [Bitly pricing](https://bitly.com/pages/pricing).

# Enters AWS
AWS has a lot of services with many features, the services I am gonna use to meet my requirements is `S3` and `cloudfront`. I am going to use cloudfront in order to serve files from s3, configure s3 as a web server so that it can respond with HTTP status 301 for files that have configured metadata `x-amz-website-redirect-location` set to the URL that I want to forward.

## S3 bucket configuration
I just need one bucket that has website enabled and public access configured so that the website works.

{% gist 85f62cc69c824aea33cf77949472f88c bucket.template.yaml %}

### S3 policy
I used the following policy to enable access for the site to all the objects under the path `/short`

{% gist 85f62cc69c824aea33cf77949472f88c policy.bucket.template.yaml %}

## Enable the custom domain
### Custom public certificate
We need to configure a public certificate for the site. Since AWS public certificates are free, we just create one that we later are gonna use on the cloudfront distribution. When the stack is beign created, AWS is going to ask you to create a DNS record type `CNAME` with a challenge in order to confirm your ownership the domain.

{% gist 85f62cc69c824aea33cf77949472f88c certificate.template.yaml %}

### Cloudfront distribution
On the cloudfront distribution we need to configure multiple things; the custom domain with an Alias, The certificate we created on the previous step. The most important part is the origin, here we tell cloudfront that all the request can be looked at our S3 website and we'll prepend the `/short` that e configured before. 

{% gist 85f62cc69c824aea33cf77949472f88c cloudfront.template.yaml %}

# Configure your domain
This process require you to configure your domain twice. The first time to validate that you own the domain so that AWS can generate your puplic certificate. The second time is to assign your custom domain to cloud front, you just need to create a domain record type CNAME that points to your cloudfront distribution URL.

# Create the link
Finally to create the link we have to upload a file to our bucket and configure the metadata to have the properties `Content-Type` and `x-amz-website-redirect-location` with the URL you want to redirect.

![s3 object metadata](/assets/images/2022-11-26/short-link-metadata.png)

Finally if you try it out it will redirect you to the page and you've successfuly created a link shortener.

![get request return 301 http code](/assets/images/2022-11-26/redirect.png)

# Conclusions
As always, implementing your own system has risks you might have to worry, and doing so might be easy when you are already working with AWS so using this method will depend on your specific use case. Having said that, if all you need is to shorten links with a custom domain, this method is easy and has low maintenance work since there are no server you need to keep updating or code to maintain.
