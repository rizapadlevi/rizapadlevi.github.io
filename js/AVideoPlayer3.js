//==================================================Fungsi ke 3====================================

var AVideoPlayer3 = function() {

    this.duration         = 0;
    this.current_progress = 0;
    this.progressWidth    = 4;
    this.paused           = true;
  
    this.elProgressBar   = null;
    this.elProgressTrack = null;
    this.elProgressFill  = null;
    this.elAlertSound    = null;
    this.elVideo         = null;
    this.elVideoScreen   = null;
    this.elControlBack   = null;
    this.elControlPlay   = null;
    this.elControlVolume = null;
  
    this._initElements = function() {
      this.elProgressBar   = document.getElementById('progress-bar3');
      this.elProgressTrack = document.getElementById('progress-bar-track3');
      this.elProgressFill  = document.getElementById('progress-bar-fill3');
      this.elAlertSound    = document.getElementById('alert-sound3');
      this.elVideo         = document.getElementById('video-src3');
      this.elVideoScreen   = document.getElementById('video-screen3');
      this.elControlBack   = document.getElementById('control-back3');
      this.elControlPlay   = document.getElementById('control-play3');
      this.elControlVolume = document.getElementById('control-volume3');
    }
  
    this.setProgress = function(progress) {
      var new_progress = this.progressWidth*progress;
      this._setProgressWidth(new_progress);
      var progress_coord = this._getProgressCoord();
      if (progress_coord != undefined) {
        progress_coord.x = -(this.progressWidth-new_progress)/2;
        this._setProgressCoord(progress_coord);
      }
    }
    this._getProgressCoord = function() {
      return AFRAME.utils.coordinates.parse(this.elProgressFill.getAttribute("position"))
    }
    this._getProgressWidth = function() {
      return parseFloat(this.elProgressFill.getAttribute("width"));
    }
    this._setProgressCoord = function(coord) {
      this.elProgressFill.setAttribute("position", coord);
    }
    this._setProgressWidth = function(width) {
      this.elProgressFill.setAttribute("width", width);
    }
  
    this.isProgressBarVisible = function(isVisible) {
      this.elProgressTrack.setAttribute("visible", isVisible);
      this.elProgressFill.setAttribute("visible", isVisible);
    }
    this.isControlVisible = function(isVisible) {
      this.elControlBack.setAttribute("visible", isVisible);
      this.elControlVolume.setAttribute("visible", isVisible);
    }
  
    this._addPlayerEvents = function() {
      var that = this;
      this.elVideo.pause();
      this.elVideo.onplay = function() {
        that.duration = this.duration;
      }
      this.elVideo.ontimeupdate = function() {
        if (that.duration > 0) {
          that.current_progress = this.currentTime/that.duration;
        }
        that.setProgress(that.current_progress);
      }
    }
  
    this._addControlsEvent = function() {
      var that = this;
  
      this.elControlPlay.addEventListener('click', function () {
        that._playAudioAlert();
        if (that.elVideo.paused) {
          this.setAttribute('src', '#pause');
          that.elVideo.play();
          that.paused = false;
          that.isProgressBarVisible(false);
          that.isControlVisible(true);
        } else {
          this.setAttribute('src', '#play');
          that.elVideo.pause();
          that.paused = true;
          that.isProgressBarVisible(false);
          that.isControlVisible(false);
        }
      });
  
      this.elControlVolume.addEventListener('click', function () {
        that._playAudioAlert();
        if (that.elVideo.muted) {
          that.elVideo.muted = false;
          this.setAttribute('src', '#volume-normal');
        } else {
          that.elVideo.muted = true;
          this.setAttribute('src', '#volume-mute');
        }
      });
  
      this.elControlBack.addEventListener('click', function () {
        that._playAudioAlert();
        that.elVideo.currentTime = 0;
      });
    }
  
    this._playAudioAlert = function() {
      if (this.elAlertSound.components !== undefined && this.elAlertSound.components.sound !== undefined) {
        this.elAlertSound.components.sound.playSound();
      }
    }
  
    this._mobileFriendly = function() {
      if (AFRAME.utils.device.isMobile()) {
        var that = this;
        let video_permission        = document.getElementById('video-permission');
        let video_permission_button = document.getElementById('video-permission-button');
  
        video_permission.style.display = 'block';
        video_permission_button.addEventListener("click", function() {
          video_permission.style.display = 'none';
          that.elVideo.play();
          that.elVideo.pause();
        }, false);
      }
    }
  
    this.init = function() {
      this._initElements();
      this.setProgress(this.current_progress);
      this._addPlayerEvents();
      this._addControlsEvent();
      this._mobileFriendly();
    }
  
    this.init();
  }