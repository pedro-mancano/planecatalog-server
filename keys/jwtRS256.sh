ssh-keygen -t rsa -b 4096 -m PEM -f private.key
# Don't add passphrase
openssl rsa -in private.key -pubout -outform PEM -out public.key.pub
cat private.key
cat public.key.pub
