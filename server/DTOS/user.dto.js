class USERDTO {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.profilePic = user.profilePic;
    this.bio = user.pbio;
    this.followers = user.followers;
    this.following = user.following;
    this.posts = user.posts;
    this.bookmarks = user.bookmarks;
    this.gender = user.gender;
  }
}

export default USERDTO;
