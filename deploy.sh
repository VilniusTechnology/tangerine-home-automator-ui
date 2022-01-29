#!/bin/bash
# 1. Build
npm run build

echo "Will TGZ"
# 2. Create tarball with date
tar -zcvf nest-ui.tar.gz dist/tangerine-home-automator-ui

echo "Will SEND"
# 3. Send over SSH
rsync -avz --exclude '.*/' --exclude '.*' --progress ./nest-ui.tar.gz  serveris@serveris.local:/tangerine/uploads/nest-ui.tar.gz

echo "Will Cleanup"
# 4. Clen ap
rm nest-ui.tar.gz

# ln -s /certs /tangerine/nest-ui/assets/certs
