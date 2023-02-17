class Event {
  constructor(element, timeline) {
    this.element = element
    this.timeline = timeline
  }
  hover() {
    let target = document.querySelectorAll(this.element)
    target.addEventListener('mouseenter', () => this.timeline.play())
    target.addEventListener('mouseenter', () => this.timeline.reverse())
  }
}

export default Event
