import mapJson from "assets/map/plaza.json";
import nyeJSON from "assets/map/nye.json";

import { SceneId } from "../mmoMachine";
import { BaseScene, NPCBumpkin } from "./BaseScene";
import { Label } from "../containers/Label";
import { interactableModalManager } from "../ui/InteractableModals";
import { AudioController } from "../lib/AudioController";
import {
  AudioLocalStorageKeys,
  getCachedAudioSetting,
} from "../../game/lib/audio";
import { PlaceableContainer } from "../containers/PlaceableContainer";
import { budImageDomain } from "features/island/collectibles/components/Bud";

export const PLAZA_BUMPKINS: NPCBumpkin[] = [
  {
    x: 371,
    y: 344,
    npc: "pumpkin' pete",
  },
  {
    x: 815,
    y: 213,
    npc: "frankie",
    direction: "left",
  },
  {
    x: 316,
    y: 245,
    npc: "stella",
  },
  {
    x: 631,
    y: 98,
    npc: "timmy",
  },
  {
    x: 307,
    y: 72,
    npc: "raven",
    direction: "left",
  },
  {
    x: 367,
    y: 120,
    npc: "blacksmith",
  },
  {
    x: 760,
    y: 390,
    npc: "grimbly",
  },
  {
    x: 810,
    y: 380,
    npc: "grimtooth",
    direction: "left",
  },
  // {
  //   x: 120,
  //   y: 170,
  //   npc: "gabi",
  // },
  {
    x: 480,
    y: 140,
    npc: "cornwell",
  },
  {
    x: 795,
    y: 118,
    npc: "bert",
    direction: "left",
  },
  {
    x: 534,
    y: 88,
    npc: "betty",
    direction: "left",
  },
  {
    x: 729,
    y: 270,
    npc: "grubnuk",
    direction: "left",
  },
  {
    x: 834,
    y: 335,
    npc: "luna",
    direction: "left",
  },
  {
    x: 90,
    y: 70,
    npc: "tywin",
  },
  {
    x: 505,
    y: 352,
    npc: "birdie",
    direction: "left",
  },
  {
    x: 208,
    y: 402,
    npc: "billy",
  },
  {
    x: 224,
    y: 293,
    npc: "hank",
  },
  {
    x: 442,
    y: 163,
    npc: "mayor",
    direction: "left",
  },
];
export class PlazaScene extends BaseScene {
  sceneId: SceneId = "plaza";

  placeables: {
    [sessionId: string]: PlaceableContainer;
  } = {};

  constructor() {
    const showNYE =
      Date.now() > new Date("2023-12-31").getTime() &&
      Date.now() < new Date("2024-01-02").getTime();

    super({
      name: "plaza",
      map: { json: showNYE ? nyeJSON : mapJson },
      audio: { fx: { walk_key: "dirt_footstep" } },
    });
  }

  preload() {
    this.load.spritesheet("plaza_bud", "world/plaza_bud.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    this.load.spritesheet("plaza_bud_2", "world/plaza_bud_2.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    this.load.spritesheet("plaza_bud_3", "world/plaza_bud_3.png", {
      frameWidth: 15,
      frameHeight: 18,
    });

    this.load.spritesheet("turtle_bud", "world/turtle.png", {
      frameWidth: 15,
      frameHeight: 17,
    });

    this.load.spritesheet("orange_bud", "world/orange_bud.png", {
      frameWidth: 15,
      frameHeight: 16,
    });

    this.load.spritesheet("snow_horn_bud", "world/snow_horn_bud.png", {
      frameWidth: 15,
      frameHeight: 14,
    });

    this.load.spritesheet("snow_bud", "world/snow_mushroom.png", {
      frameWidth: 15,
      frameHeight: 15,
    });

    this.load.spritesheet("fat_chicken", "world/fat_chicken.png", {
      frameWidth: 17,
      frameHeight: 21,
    });

    this.load.image("chest", "world/rare_chest.png");

    super.preload();

    const audioMuted = getCachedAudioSetting<boolean>(
      AudioLocalStorageKeys.audioMuted,
      false
    );

    if (!audioMuted) {
      // Ambience SFX
      if (!this.sound.get("nature_1")) {
        const nature1 = this.sound.add("nature_1");
        nature1.play({ loop: true, volume: 0.01 });
      }

      // Boat SFX
      if (!this.sound.get("boat")) {
        const boatSound = this.sound.add("boat");
        boatSound.play({ loop: true, volume: 0, rate: 0.6 });

        this.soundEffects.push(
          new AudioController({
            sound: boatSound,
            distanceThreshold: 130,
            coordinates: { x: 352, y: 462 },
            maxVolume: 0.2,
          })
        );
      }
    }

    // Shut down the sound when the scene changes
    this.events.once("shutdown", () => {
      this.sound.getAllPlaying().forEach((sound) => {
        sound.destroy();
      });
    });
  }

  async create() {
    this.map = this.make.tilemap({
      key: "main-map",
    });

    super.create();

    this.initialiseNPCs(PLAZA_BUMPKINS);

    const auctionLabel = new Label(this, "AUCTIONS", "brown");
    auctionLabel.setPosition(601, 260);
    auctionLabel.setDepth(10000000);
    this.add.existing(auctionLabel);

    const clubHouseLabel = new Label(this, "CLUBHOUSE", "brown");
    clubHouseLabel.setPosition(152, 262);
    clubHouseLabel.setDepth(10000000);
    this.add.existing(clubHouseLabel);

    // Plaza Bud
    const fatChicken = this.add.sprite(106, 352, "fat_chicken");
    this.anims.create({
      key: "fat_chicken_animation",
      frames: this.anims.generateFrameNumbers("fat_chicken", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    fatChicken.play("fat_chicken_animation", true);
    fatChicken.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
      interactableModalManager.open("fat_chicken");
    });

    // Plaza Bud
    const bud = this.add.sprite(500, 420, "plaza_bud");
    this.anims.create({
      key: "plaza_bud_animation",
      frames: this.anims.generateFrameNumbers("plaza_bud", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    bud
      .play("plaza_bud_animation", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("bud");
      });

    // Plaza Bud
    const bud2 = this.add.sprite(601, 200, "plaza_bud_2");
    this.anims.create({
      key: "plaza_bud_animation_2",
      frames: this.anims.generateFrameNumbers("plaza_bud_2", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    bud2
      .play("plaza_bud_animation_2", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("bud");
      });
    bud2.setDepth(100000000000);

    const bud3 = this.add.sprite(176, 290, "plaza_bud_3");
    this.anims.create({
      key: "plaza_bud_animation_3",
      frames: this.anims.generateFrameNumbers("plaza_bud_3", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    bud3
      .play("plaza_bud_animation_3", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("bud");
      });

    const turtle = this.add.sprite(119, 293, "turtle_bud");
    turtle.setScale(-1, 1);
    this.anims.create({
      key: "turtle_bud_anim",
      frames: this.anims.generateFrameNumbers("turtle_bud", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    turtle
      .play("turtle_bud_anim", true)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("bud");
      });

    const snowHornBud = this.add.sprite(128, 235, "snow_horn_bud");
    snowHornBud.setScale(-1, 1);
    this.anims.create({
      key: "snow_horn_bud_anim",
      frames: this.anims.generateFrameNumbers("snow_horn_bud", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    snowHornBud.setVisible(false).play("snow_horn_bud_anim", true);

    const orangeBud = this.add.sprite(176, 235, "orange_bud");
    orangeBud.setScale(-1, 1);
    this.anims.create({
      key: "orange_bud_anim",
      frames: this.anims.generateFrameNumbers("orange_bud", {
        start: 0,
        end: 8,
      }),
      repeat: -1,
      frameRate: 10,
    });
    orangeBud.setVisible(false).play("orange_bud_anim", true);

    const chest = this.add
      .sprite(152, 230, "chest")
      .setVisible(false)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        interactableModalManager.open("clubhouse_reward");
      });

    const door = this.colliders
      ?.getChildren()
      .find((object) => object.data?.list?.id === "clubhouse_door");

    // TODO
    const canAccess = Object.keys(this.gameState.buds ?? {}).length > 0;

    if (door && canAccess) {
      this.physics.world.disable(door);
    }

    // Opening and closing clubhouse door
    this.onCollision["clubhouse_door"] = async (obj1, obj2) => {
      if (!canAccess) {
        interactableModalManager.open("guild_house");
        return;
      }

      const wasOpen = chest.visible;
      const isOpen = (obj1 as any).y > (obj2 as any).y;

      this.layers["Club House Roof"].setVisible(isOpen);
      this.layers["Club House Base"].setVisible(isOpen);
      this.layers["Club House Door"].setVisible(isOpen);
      clubHouseLabel.setVisible(isOpen);

      snowHornBud.setVisible(!isOpen);
      orangeBud.setVisible(!isOpen);
      chest.setVisible(!isOpen);

      if (wasOpen === isOpen) {
        this.mmoService?.state.context.server?.send(0, {
          action: "open_clubhouse",
        });
      }

      return;
    };

    const server = this.mmoService?.state.context.server;
    if (!server) return;

    server.state.actions.onAdd(async (action) => {
      if (
        action.event === "open_clubhouse" &&
        !!this.layers["Club House Door"].visible
      ) {
        this.layers["Club House Door"].setVisible(false);

        await new Promise((res) => setTimeout(res, 1000));

        this.layers["Club House Door"].setVisible(true);
      }
    });
  }

  syncPlaceables() {
    const server = this.mmoServer;
    if (!server) return;

    // Destroy any dereferenced placeables
    Object.keys(this.placeables).forEach((sessionId) => {
      const hasLeft =
        !server.state.buds.get(sessionId) ||
        server.state.buds.get(sessionId)?.sceneId !== this.scene.key;

      const isInactive = !this.placeables[sessionId]?.active;

      if (hasLeft || isInactive) {
        this.placeables[sessionId]?.disappear();
        delete this.placeables[sessionId];
      }
    });

    // Create new placeables
    server.state.buds?.forEach((bud, sessionId) => {
      if (bud.sceneId !== this.scene.key) return;

      if (!this.placeables[sessionId]) {
        this.placeables[sessionId] = new PlaceableContainer({
          sprite: `https://${budImageDomain}.sunflower-land.com/sheets/idle/${bud.id}.webp`,
          x: bud.x,
          y: bud.y,
          scene: this,
        });
      }
    });
  }

  public update() {
    super.update();
    this.syncPlaceables();
  }
}
