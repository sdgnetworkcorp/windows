Vagrant.configure("2") do |config|
  config.vm.define "linux1" do |linux1|
    linux1.vm.box = "ubuntu/jammy64"
    linux1.vm.hostname = "linux1"
    linux1.vm.network "private_network", ip: "192.168.56.10"
  end

  config.vm.define "linux2" do |linux2|
    linux2.vm.box = "ubuntu/jammy64"
    linux2.vm.hostname = "linux2"
    linux2.vm.network "private_network", ip: "192.168.56.11"
  end
end