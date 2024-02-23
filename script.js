document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const horizontalLine = document.getElementById('horizontalLine');
  const currentTimeLine = document.getElementById('currentTimeLine');
  const scale = document.getElementById('scale');

  let isDragging = false;

  // Add event listeners for mouse and touch events
  horizontalLine.addEventListener('mousedown', startDrag);
  horizontalLine.addEventListener('touchstart', startDrag);

  document.addEventListener('mousemove', drag);
  document.addEventListener('touchmove', drag);

  document.addEventListener('mouseup', stopDrag);
  document.addEventListener('touchend', stopDrag);

  function startDrag(e) {
    isDragging = true;
  }

  function drag(e) {
    if (!isDragging) return;

    const rect = scale.getBoundingClientRect();
    let mouseX;

    if (e.type === 'touchmove') {
      mouseX = e.touches[0].clientX - rect.left;
    } else {
      mouseX = e.clientX - rect.left;
    }

    const percentage = (mouseX / rect.width) * 100;
    const time = (percentage / 100) * video.duration;

    currentTimeLine.style.left = percentage + '%';
    video.currentTime = time;
  }

  function stopDrag() {
    isDragging = false;
  }

  video.addEventListener('timeupdate', updateTimeline);
  video.addEventListener('loadedmetadata', updateScale);

  function updateTimeline() {
    const percentage = (video.currentTime / video.duration) * 100;
    currentTimeLine.style.left = percentage + '%';
  }

  function updateScale() {
    scale.innerHTML = '';

    const duration = video.duration;
    const interval = 30; // seconds

    for (let i = 0; i <= duration; i += interval) {
      const scaleSegment = document.createElement('div');
      scaleSegment.className = 'scaleSegment';
      scaleSegment.style.width = (interval / duration) * 100 + '%';
      scale.appendChild(scaleSegment);
    }
  }
});
