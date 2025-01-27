## Some Amplify Commands
#### SET Amplify secrets
```npx ampx sandbox secret set SIWA_TEAM_ID --profile George-myIceBreaker```

#### GET Amplify secrets
```npx ampx sandbox secret get SIWA_TEAM_ID --profile George-myIceBreaker```

#### Start Amplify sandbox
```npx ampx sandbox --profile George-myIceBreaker```

#### List All added secrets
```npx ampx sandbox secret list --profile George-myIceBreaker```

### Mounting local server folder to a remote folder
```sshfs -o IdentityFile=QDDLKali.pem kali@3.107.207.215:/home/kali/project/backend /backend```

### Copying files from my computer to a remote computer
```rsync -avz -e "ssh -i QDDLKali.pem" . kali@3.107.207.215:/home/kali/project```
```rsync -avz -e "ssh -i QDDLKali.pem" ./PesaFlow/sample.apk kali@3.107.207.215:/home/kali/DigitalLicense/backend/public/files/sample.apk```

### Recreating admin in the backend database
```curl -X POST http://127.0.0.1:3000/api/codes \
-H "Content-Type: application/json" \
-d '{"codeText": "uCMDMOpjfUyrdPAeiEtV", "isAdmin": true}'
```

### Hosting on Tor Blog
- https://medium.com/axon-technologies/hosting-anonymous-website-on-tor-network-3a82394d7a01

