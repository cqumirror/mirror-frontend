const prefix = process.env.baseURL

export default {
	getDocLink: params => {
		const list = {
			'archlinux': prefix + '#/wiki/mirror-wiki/archlinux',
			'archlinuxcn': prefix + '#/wiki/mirror-wiki/archlinuxcn',
			'crates.io-index': prefix + '#/wiki/mirror-wiki/crates.io-index',
			'centos': prefix + '#/wiki/mirror-wiki/centos',
			'debian': prefix + '#/wiki/mirror-wiki/debian',
			'debian-security': prefix + '#/wiki/mirror-wiki/debian-security',
			'fedora': prefix + '#/wiki/mirror-wiki/fedora',
			'gentoo-portage': prefix + '#/wiki/mirror-wiki/gentoo-portage',
			'gentoo-zh': prefix + '#/wiki/mirror-wiki/gentoo-zh',
			'homebrew': prefix + '#/wiki/mirror-wiki/homebrew',
			'kali': prefix + '#/wiki/mirror-wiki/kali',
			'kicad': prefix + '#/wiki/mirror-wiki/kicad',
			'linux.git': prefix + '#/wiki/mirror-wiki/linux.git',
			'manjaro': prefix + '#/wiki/mirror-wiki/manjaro',
			'opensuse': prefix + '#/wiki/mirror-wiki/opensuse',
			'openwrt': prefix + '#/wiki/mirror-wiki/openwrt',
			'pypi': prefix + '#/wiki/mirror-wiki/pypi',
			'rockylinux': prefix + '#/wiki/mirror-wiki/rockylinux',
			'ros': prefix + '#/wiki/mirror-wiki/ros',
			'ubuntu': prefix + '#/wiki/mirror-wiki/ubuntu',
			'ubuntu-releases': prefix + '#/wiki/mirror-wiki/ubuntu-releases',
		}
		return list
	}
}
