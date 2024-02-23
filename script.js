document.addEventListener('DOMContentLoaded', function () {
  const video = document.getElementById('video');
  const currentTimeLine = document.getElementById('currentTimeLine');
  const scale = document.getElementById('scale');
  const timelineContainer = document.getElementById('timelineContainer');
  const currentTimeDisplay = document.createElement('div');
  currentTimeDisplay.className = 'currentTimeDisplay';
  timelineContainer.appendChild(currentTimeDisplay);

  // Event listener for updating the timeline while the video is playing
  video.addEventListener('timeupdate', updateTimeline);

  // Event handler to update the timeline position
  function updateTimeline() {
    const duration = video.duration;
    const currentTime = video.currentTime;
    const percentage = (currentTime / duration) * 100;
  
    // Update the current time display
    currentTimeDisplay.textContent = formatTime(currentTime);
    currentTimeDisplay.style.left = `${percentage}%`;
  
    // Update the current timeline position
    currentTimeLine.style.left = `${percentage}%`;
  
    // Move the scale container to keep the current time line in view
    const scaleContainerWidth = timelineContainer.clientWidth;
    const currentTimeLinePosition = currentTimeLine.offsetLeft;
    const offset = currentTimeLinePosition - scaleContainerWidth / 2;
    timelineContainer.scrollLeft = offset;
  }

  // Initialize the timeline with scale intervals
  initializeTimeline();

  // Event listener for updating the timeline when video metadata is loaded
  video.addEventListener('loadedmetadata', function () {
    initializeTimeline();
  });

  // Initialize the timeline with scale intervals
  function initializeTimeline() {
    const duration = video.duration;
    const interval = 30; // 30 seconds interval
    const numIntervals = Math.floor(duration / interval);

    // Clear previous scale elements
    scale.innerHTML = '';

    for (let i = 0; i <= numIntervals; i++) {
      const intervalMarker = document.createElement('div');
      intervalMarker.className = 'interval-marker';

      // Calculate the time for this interval
      const timeForInterval = i * interval;

      // Set the left position based on the percentage of the duration
      const leftPosition = (timeForInterval / duration) * 100;
      intervalMarker.style.left = `${leftPosition}%`;

      // Create label for the interval marker
      const label = document.createElement('div');
      label.className = 'interval-label';
      label.textContent = formatTime(timeForInterval);
      label.style.left = `${leftPosition}%`;

      // Append interval marker and label to the scale
      scale.appendChild(intervalMarker);
      scale.appendChild(label);
    }
  }

  // Format time in MM:SS format
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }
});
