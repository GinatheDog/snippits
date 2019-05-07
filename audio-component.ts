@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  track: string = 'assets/sounds/beep.mp3';

  constructor(private audio: AudioProvider) {}

  getUnreadMessagesCount() {
  if (this.unreadMessagesCount) {
    if (this.unreadMessagesCount > 0) {
      this.playSound();
      return this.unreadMessagesCount;
    }
  }
  return null;
}

  playSound() {
    this.audio.loadSound(this.track)
  }
}
