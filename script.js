document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const currentTimeLine = document.getElementById('currentTimeLine');
  const timelineContainer = document.getElementById('timelineContainer');
  const currentTimeDisplay = document.getElementById('currentTimeDisplay');

  let scaleFactor = 1;

  video.addEventListener('timeupdate', updateTimeline);
  video.addEventListener('loadedmetadata', initializeTimeline);

  function updateTimeline() {
    const duration = video.duration;
    const currentTime = video.currentTime;

    currentTimeDisplay.textContent = formatTime(currentTime);

    const timelineRect = timelineContainer.getBoundingClientRect();
    const timelineMiddle = timelineRect.width / 2;
    const timelinePosition = timelineMiddle - (timelineRect.width * currentTime) / duration;

    currentTimeLine.style.left = `${timelineMiddle}px`;
    currentTimeDisplay.style.left = `${timelineMiddle}px`;

    updateScaleDynamically();
  }

  function updateScaleDynamically() {
    const duration = video.duration;
    const interval = 30;

    const totalLabels = Math.ceil(duration / interval);

    // Clear previous markers and labels
    const existingMarkers = document.querySelectorAll('.interval-marker, .interval-label');
    existingMarkers.forEach(marker => marker.remove());

    // Add interval markers and labels
    for (let i = 0; i <= totalLabels; i++) {
      const timeForLabel = i * interval;
      const leftPosition = ((timeForLabel - video.currentTime) / duration) * 100 * scaleFactor + 50;

      const intervalMarker = document.createElement('div');
      intervalMarker.className = 'interval-marker';
      intervalMarker.style.left = `${leftPosition}%`;

      const intervalLabel = document.createElement('div');
      intervalLabel.className = 'interval-label';
      intervalLabel.textContent = formatTime(timeForLabel);
      intervalLabel.style.left = `${leftPosition}%`;

      timelineContainer.appendChild(intervalMarker);
      timelineContainer.appendChild(intervalLabel);
    }
  }

  function initializeTimeline() {
    const duration = video.duration;
    const interval = 30;

    const totalLabels = Math.ceil(duration / interval);

    // Add interval markers and labels
    for (let i = 0; i <= totalLabels; i++) {
      const timeForLabel = i * interval;
      const leftPosition = ((timeForLabel - video.currentTime) / duration) * 100 * scaleFactor + 50;

      const intervalMarker = document.createElement('div');
      intervalMarker.className = 'interval-marker';
      intervalMarker.style.left = `${leftPosition}%`;

      const intervalLabel = document.createElement('div');
      intervalLabel.className = 'interval-label';
      intervalLabel.textContent = formatTime(timeForLabel);
      intervalLabel.style.left = `${leftPosition}%`;

      timelineContainer.appendChild(intervalMarker);
      timelineContainer.appendChild(intervalLabel);
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
});
