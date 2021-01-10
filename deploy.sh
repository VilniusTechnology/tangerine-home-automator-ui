#!/bin/bash
# 1. Build
npm run build

# 2. Create tarball with date
tar -zcvf nest-ui.tar.gz dist/tangerine-home-automator-ui

# 3. Send over SSH
rsync -avz --exclude '.*/' --exclude '.*' --progress ./nest-ui.tar.gz  serveris@serveris.local:/home/tangerine/uploads/nest-ui.tar.gz

# 4. Clen ap
rm nest-ui.tar.gz
