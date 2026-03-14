export interface SocialEntry {
  type: 'github' | 'twitter' | 'email'
  icon: string
  link: string
}

export interface Creator {
  avatar: string
  name: string
  username?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
  nameAliases?: string[]
  emailAliases?: string[]
}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

export const creators: Creator[] = [
  {
    name: 'Karasu', // 替换为你的姓名或昵称
    avatar: '', // 留空以使用 GitHub 头像，或提供头像 URL
    username: '你的GitHub用户名', // 替换为你的实际 GitHub 用户名
    title: '知识库维护者',
    desc: '个人笔记、学习记录和思考总结',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/你的GitHub用户名' },
      { type: 'twitter', icon: 'twitter', link: 'https://twitter.com/你的Twitter用户名' },
    ],
    nameAliases: ['Karasu', '你的别名'], // 替换为你的可能别名
    emailAliases: ['你的邮箱地址'],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
