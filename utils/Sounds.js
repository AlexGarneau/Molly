(function (scope) {
    "use strict";

    var s = {};

    s.MEMORY_SOUND_DING = "memory_sound_ding";
    s.MEMORY_SOUND_BUTTON = "memory_sound_button";
    s.MEMORY_SOUND_FLIP = "memory_sound_flip";
    s.MEMORY_SOUND_SHUFFLE = "memory_sound_shuffle";
    s.MEMORY_MUSIC_INTRO = "memory_music_intro";
    s.MEMORY_MUSIC_VICTORY = "memory_music_victory";

    s._currentlyPlayingSounds = [];
    s._currentlyLoopingSounds = [];

    s.getSoundManifest = function (gameID) {
        var manifest = [];
        switch (gameID) {
            case scope.ViewManager.GAME_DRESSUP:
              // TODO: Add sound assets. Yay.
              break;
            case scope.ViewManager.GAME_MEMORY:
              manifest = [
                {id: s.MEMORY_SOUND_DING, src: "games/memory/assets/sounds/reward.mp3", type: "sound"},
                {id: s.MEMORY_SOUND_FLIP, src: "games/memory/assets/sounds/card_flip.mp3", type: "sound"},
                {id: s.MEMORY_SOUND_SHUFFLE, src: "games/memory/assets/sounds/card_shuffle.mp3", type: "sound"},
                {id: s.MEMORY_SOUND_BUTTON, src: "games/memory/assets/sounds/boop.mp3", type: "sound"},
                //{id: s.MEMORY_MUSIC_INTRO, src: "games/memory/assets/sounds/piano_flick.mp3", type: "sound"},
                {id: s.MEMORY_MUSIC_VICTORY, src: "games/memory/assets/sounds/guitar_flick.mp3", type: "sound"}
              ];
              break;
        }

        return manifest;
    };

    s.playSound = function (soundID, loop = false) {
        if (scope.Sounds._currentlyLoopingSounds[soundID] && loop) {
          // Sound's already looping. Return.
          scope.Sounds._currentlyLoopingSounds[soundID].play();
          return;
        }

        var sound = createjs.Sound.play(soundID);
        sound.loop = loop ? -1 : 0;
        if (loop) {
          scope.Sounds._currentlyLoopingSounds[soundID] = sound;
        } else {
          // Let multiple non-looping versions of the same sound play.
          var index = 0;
          while (scope.Sounds._currentlyPlayingSounds[soundID + "_" + index]) { index++; }
          scope.Sounds._currentlyPlayingSounds[soundID + "_" + index] = sound;
        }
        sound.play();
    };

    s.stopSound = function (soundID) {
        var sound = scope.Sounds._currentlyPlayingSounds[soundID] || scope.Sounds._currentlyLoopingSounds[soundID];
        if (sound) {
          sound.stop();
          if (sound.loop != -1) {
            delete scope.Sounds._currentlyPlayingSounds[soundID];
          }
        }
    };

    s.stopAllSounds = function () {
      for (var i in scope.Sounds._currentlyPlayingSounds) { s.stopSound(i); }
      for (var i in scope.Sounds._currentlyLoopingSounds) { s.stopSound(i); }
    };

    var p = {};

    scope.Sounds = scope.AbstractView.extend(p, s);

}(window));
