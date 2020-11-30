#!/bin/bash
# 1. Build
ng build --prod

# 2. Create tarball with date
tar -zcvf nest-ui.tar.gz dist/tangerine-home-automator-ui

# 3. Send over SSH
# scp nest-ui.tar.gz  tangerine@tangerine.local:/home/tangerine/nest-ui/nest-ui.tar.gz

#sftp serveris@serveris.local:/home/tangerine <<< $'put {local_file_path}'

rsync -avz --exclude '.*/' --exclude '.*' --progress ./nest-ui.tar.gz  serveris@serveris.local:/home/tangerine/uploads/nest-ui.tar.gz


### TODO
# Switch symlink:
# ssh -t madcatzx@tangerine.local 'rm -rf /home/tangerine/nest-ui'
# ssh -t madcatzx@tangerine.local 'mkdir /home/tangerine/nest-ui'
# Extract on remote: ssh -t madcatzx@tangerine.local 'tar -C /home/tangerine/nest-ui -zxvf nest-ui.tar.gz'

# /home/tangerine/nest-ui/dist/tangerine-home-automator-ui
