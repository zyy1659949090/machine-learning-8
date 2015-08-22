## create startup script: for 'vagrant-mounted' event
file {"vagrant-startup-script":
    path    => "/etc/init/workaround-vagrant-bug-6074.conf ",
    ensure  => 'present',
    content => @("EOT"),
               #!upstart
               description workaround for https://github.com/mitchellh/vagrant/issues/6074

               ## start job defined in this file after system services, and processes have already loaded
               #       (to prevent conflict).
               #
               #  Note: this is a workaround for https://github.com/mitchellh/vagrant/issues/6074
               #
               #  @vagrant-mounted, an event that executes after the shared folder is mounted
               #  @[2345], represents all configuration states with general linux, and networking access
               start on (vagrant-mounted and runlevel [2345])

               ## job will be blocked until the job has completely transitioned back to stopped
               task

               env MOUNTPOINT=/vagrant

               script
                   until mountpoint -q $MOUNTPOINT; do sleep 1; done
                   /sbin/initctl emit --no-wait vagrant-mounted MOUNTPOINT=$MOUNTPOINT
               end script
               | EOT
               notify  => Exec["dos2unix-upstart-vagrant"],
}

## dos2unix upstart: convert clrf (windows to linux) in case host machine is windows.
#
#  @notify, ensure the webserver service is started. This is similar to an exec statement, where the
#      'refreshonly => true' would be implemented on the corresponding listening end point. But, the
#      'service' end point does not require the 'refreshonly' attribute.
exec {"dos2unix-upstart-vagrant":
    command => "dos2unix /etc/init/vagrant.conf",
    notify  => Service["vagrant"],
}

## start vagrant service
service {"vagrant":
    ensure => 'running',
    enable => 'true',
}