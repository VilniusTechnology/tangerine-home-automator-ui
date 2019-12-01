#!/bin/bash
# 1. Build
ng build --prod

# 2. Create tarball with date
tar -zcvf nest-ui.tar.gz dist

# 3. Send over SSH
scp nest-ui.tar.gz  tangerine@tangerine.local:/home/tangerine/nest-ui/nest-ui.tar.gz 


### TODO
# Switch symlink: 
# ssh -t madcatzx@tangerine.local 'rm -rf /home/madcatzx/projects/nest-ui'
# ssh -t madcatzx@tangerine.local 'mkdir /home/madcatzx/projects/nest-ui'
# Extract on remote: ssh -t madcatzx@tangerine.local 'tar -C /home/madcatzx/projects/nest-ui -zxvf nest-ui.tar.gz'

# /home/madcatzx/projects/nest-ui/dist/tangerine-home-automator-ui
