document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const currentTimeLine = document.getElementById('currentTimeLine');
  const scale = document.getElementById('scale');
  const timelineContainer = document.getElementById('timelineContainer');
  const currentTimeDisplay = document.createElement('div');
  currentTimeDisplay.className = 'currentTimeDisplay';
  timelineContainer.appendChild(currentTimeDisplay);

  let isDragging = false;

  // Event listener for updating the timeline while the video is playing
  video.addEventListener('timeupdate', updateTimeline);

  function updateTimeline() {
    const duration = video.duration;
    const currentTime = video.currentTime;
    const percentage = (currentTime / duration) * 100;

    // Update the current time display
    currentTimeDisplay.textContent = formatTime(currentTime);
    currentTimeDisplay.style.left = `${percentage}%`;
    
    if (!isDragging) {
      currentTimeLine.style.left = `${percentage}%`;
    }
  }

  currentTimeDisplay.addEventListener('mousedown', startDragging);

  document.addEventListener('mouseup', stopDragging);

  document.addEventListener('mousemove', handleDragging);

  // Function to handle the start of dragging
  function startDragging(event) {
    isDragging = true;
    video.pause();
    event.preventDefault();
  }

  // Function to handle dragging
  function handleDragging(event) {
    if (!isDragging) return;

    const timelineRect = timelineContainer.getBoundingClientRect();
    const clickX = event.clientX - timelineRect.left;
    const percentage = (clickX / timelineRect.width) * 100;

    const clampedPercentage = Math.max(0, Math.min(100, percentage));

    // Update the current timeline position
    currentTimeLine.style.left = `${clampedPercentage}%`;

    // Update the video time based on the dragged position
    const duration = video.duration;
    const newTime = (clampedPercentage / 100) * duration;
    video.currentTime = newTime;

    // Update the current time display
    currentTimeDisplay.textContent = formatTime(newTime);
    currentTimeDisplay.style.left = `${clampedPercentage}%`;
  }

  function stopDragging() {
    if (isDragging) {
      isDragging = false;
      video.play();
    }
  }

  initializeTimeline();

  // Event listener for updating the timeline when video metadata is loaded
  video.addEventListener('loadedmetadata', function () {
    initializeTimeline();
  });

  function initializeTimeline() {
    const duration = video.duration;
    const interval = 30;
    const numIntervals = Math.floor(duration / interval);

    scale.innerHTML = '';

    for (let i = 0; i <= numIntervals; i++) {
      const intervalMarker = document.createElement('div');
      intervalMarker.className = 'interval-marker';

      //To Calculate the time for this interval
      const timeForInterval = i * interval;

      const leftPosition = (timeForInterval / duration) * 100;
      intervalMarker.style.left = `${leftPosition}%`;

      const label = document.createElement('div');
      label.className = 'interval-label';
      label.textContent = formatTime(timeForInterval);
      label.style.left = `${leftPosition}%`;

      scale.appendChild(intervalMarker);
      scale.appendChild(label);
    }
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
});
