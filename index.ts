import { Color3, Vector3, Color4 } from '@dcl/sdk/math'
import { CameraModeArea, engine, LightSource, Transform, CameraType, InputModifier, MeshRenderer, Material, MeshCollider, ColliderLayer, Entity, Name, GltfContainer, AudioSource, executeTask } from '@dcl/sdk/ecs'
import { teleportTo } from '~system/RestrictedActions'
import { ReactEcsRenderer } from '@dcl/sdk/react-ecs'
import { UIMenu } from './ui'
import { EntityNames } from '../assets/scene/entity-names'


let showBlackScreen = false
let showWhiteScreen = false
let ringEntity: Entity | null = null

let objectMessageText = ''
let objectMessageVisible = false
let objectMessageTimer = 0
const objectMessageDuration = 3.0


let blackScreenAlpha = 0
const blackScreenFadeDurationSec = 0.7
let lastAlphaNotified = -1


let whiteScreenAlpha = 0
const whiteScreenFadeDurationSec = 7.0
let lastWhiteAlphaNotified = -1
let whiteScreenTextVisible = false
let whiteScreenSecondTextVisible = false
let whiteScreenThirdTextVisible = false
let whiteScreenChoiceVisible = false
let whiteScreenImageVisible = false
let whiteScreenRightImageVisible = false
let rightImageConversationStageVisible = false
let rightImageCodeStageVisible = false
let rightImageFinalStageVisible = false
let rightImageCodeUIVisible = false

// Initial warning overlay after clicking the first "next"
let initialWarningVisible = false

export function showInitialWarning() {
  initialWarningVisible = true
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getInitialWarningVisible() {
  return initialWarningVisible
}

export function hideInitialWarningNow() {
  initialWarningVisible = false
  ReactEcsRenderer.setUiRenderer(UIMenu)
}


let blackScreenTextVisible = false
let blackScreenTextDelayActive = false
let blackScreenTextDelayElapsedMs = 0
const blackScreenTextDelayMs = 1000

let blackScreenButtonVisible = false
let blackScreenButtonDelayActive = false
let blackScreenButtonDelayElapsedMs = 0
const blackScreenButtonDelayMs = 1000


let mainBeforeSoundEntity: Entity | null = null
let transitionSoundEntity: Entity | null = null

export function setBlackScreen(visible: boolean) {
  showBlackScreen = visible
}

export function getBlackScreen() {
  return showBlackScreen
}

export function getBlackScreenAlpha() {
  return blackScreenAlpha
}

export function getBlackScreenTextVisible() {
  return blackScreenTextVisible
}

export function getBlackScreenButtonVisible() {
  return blackScreenButtonVisible
}

export function showObjectMessage(text: string) {
  objectMessageText = text
  objectMessageVisible = true
  objectMessageTimer = 0
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getObjectMessageVisible() {
  return objectMessageVisible
}

export function getObjectMessageText() {
  return objectMessageText
}

export function setWhiteScreen(visible: boolean) {
  showWhiteScreen = visible
}

export function getWhiteScreen() {
  return showWhiteScreen
}

export function getWhiteScreenAlpha() {
  return whiteScreenAlpha
}

export function getWhiteScreenTextVisible() {
  return whiteScreenTextVisible
}

export function getWhiteScreenSecondTextVisible() {
  return whiteScreenSecondTextVisible
}

export function showWhiteSecondText() {
  whiteScreenSecondTextVisible = true
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getWhiteScreenThirdTextVisible() {
  return whiteScreenThirdTextVisible
}

export function showWhiteThirdText() {
  whiteScreenThirdTextVisible = true
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getWhiteScreenChoiceVisible() {
  return whiteScreenChoiceVisible
}

export function showWhiteChoice() {
  whiteScreenChoiceVisible = true
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getWhiteScreenImageVisible() {
  return whiteScreenImageVisible
}

export function showWhiteImage() {
  whiteScreenImageVisible = true
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getWhiteScreenRightImageVisible() {
  return whiteScreenRightImageVisible
}

export function showWhiteRightImage() {
  whiteScreenRightImageVisible = true
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getRightImageConversationStageVisible() {
  return rightImageConversationStageVisible
}

export function showRightImageConversationStage() {
  rightImageConversationStageVisible = true
  // ensure other right-image stages are hidden
  rightImageCodeStageVisible = false
  rightImageFinalStageVisible = false
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getRightImageCodeStageVisible() {
  return rightImageCodeStageVisible
}

export function showRightImageCodeStage() {
  // move from conversation to code stage
  rightImageConversationStageVisible = false
  rightImageCodeStageVisible = true
  rightImageFinalStageVisible = false
  // hide UI initially and start 15s delay to show it
  rightImageCodeUIVisible = false
  let elapsed = 0
  const delaySys = (dt: number) => {
    elapsed += dt
    if (elapsed >= 15) {
      rightImageCodeUIVisible = true
      ReactEcsRenderer.setUiRenderer(UIMenu)
      engine.removeSystem(delaySys)
    }
  }
  engine.addSystem(delaySys)
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getRightImageFinalStageVisible() {
  return rightImageFinalStageVisible
}

export function showRightImageFinalStage() {
  // move to final stage; keep code stage container so final UI can render
  rightImageConversationStageVisible = false
  rightImageCodeStageVisible = true
  rightImageFinalStageVisible = true
  ReactEcsRenderer.setUiRenderer(UIMenu)
}

export function getRightImageCodeUIVisible() {
  return rightImageCodeUIVisible
}


export function startLeftButtonSequence() {
  
  const leftBtnEntity = engine.addEntity()
  Transform.create(leftBtnEntity, { position: Vector3.create(0, 0, 0) })
  AudioSource.create(leftBtnEntity, {
    audioClipUrl: 'assets/sounds/left button.mp3',
    playing: true,
    loop: true,
    volume: 1.0
  })

  
  let elapsed = 0
  const timer = (dt: number) => {
    elapsed += dt
    if (elapsed >= 20) {
      
      try {
        teleportTo({ worldCoordinates: { x: -104, y: 98 } })
      } catch (err) {
        
        ;(globalThis as any)?.open?.('https://play.decentraland.org/?position=-104,98', '_blank')
      }
      engine.removeSystem(timer)
    }
  }
  engine.addSystem(timer)
}


export function startRightButtonSound() {
  const rightBtnEntity = engine.addEntity()
  Transform.create(rightBtnEntity, { position: Vector3.create(0, 0, 0) })
  AudioSource.create(rightBtnEntity, {
    audioClipUrl: 'assets/sounds/right button.mp3',
    playing: true,
    loop: true,
    volume: 1.0
  })
}

export function goToGenesis00() {
  try {
    teleportTo({ worldCoordinates: { x: 0, y: 0 } })
  } catch (err) {
    ;(globalThis as any)?.open?.('https://play.decentraland.org/?position=0,0', '_blank')
  }
}

export function setRingEntity(entity: Entity | null) {
  ringEntity = entity
}

export function triggerBlackScreenNow() {
  if (!showBlackScreen) {
    showBlackScreen = true
    blackScreenAlpha = 0
    blackScreenTextVisible = false
    blackScreenTextDelayActive = false
    blackScreenTextDelayElapsedMs = 0
    blackScreenButtonVisible = false
    blackScreenButtonDelayActive = false
    blackScreenButtonDelayElapsedMs = 0
    ReactEcsRenderer.setUiRenderer(UIMenu)
  }
}

export function triggerWhiteScreenNow() {
  if (!showWhiteScreen) {
    showWhiteScreen = true
    whiteScreenAlpha = 0
    whiteScreenTextVisible = false
    whiteScreenSecondTextVisible = false
    whiteScreenThirdTextVisible = false
    whiteScreenChoiceVisible = false
    whiteScreenImageVisible = false
    whiteScreenRightImageVisible = false
    ReactEcsRenderer.setUiRenderer(UIMenu)
  }
}

export function hideBlackScreenAndRemoveRing() {
  setBlackScreen(false)
  if (ringEntity) {
    engine.removeEntity(ringEntity)
    ringEntity = null
  }
  ReactEcsRenderer.setUiRenderer(UIMenu)
}


let hideBlackScreenTimerActive = false

export function hideBlackScreenAfter(delaySec: number) {
  if (hideBlackScreenTimerActive) {
    return
  }
  
  if (!showBlackScreen) {
    triggerBlackScreenNow()
  }
  
  hideBlackScreenTimerActive = true
  let elapsed = 0
  const timerSys = (dt: number) => {
    elapsed += dt
    if (elapsed >= delaySec) {
      hideBlackScreenAndRemoveRing()
      hideBlackScreenTimerActive = false
      engine.removeSystem(timerSys)
    }
  }
  engine.addSystem(timerSys)
}


export function fadeOutMainBefore(durationSec: number) {
  if (!mainBeforeSoundEntity || !AudioSource.has(mainBeforeSoundEntity)) return
  const target = mainBeforeSoundEntity
  const startVol = AudioSource.get(target).volume ?? 1
  let elapsed = 0
  const sys = (dt: number) => {
    elapsed += dt
    const k = Math.min(1, elapsed / durationSec)
    const v = Math.max(0, startVol * (1 - k))
    if (AudioSource.has(target)) {
      const mut = AudioSource.getMutable(target)
      mut.volume = v
      if (k >= 1) {
        mut.playing = false
        
        const afterWell = engine.addEntity()
        Transform.create(afterWell, { position: Vector3.create(0, 0, 0) })
        AudioSource.create(afterWell, {
          audioClipUrl: 'assets/sounds/after_well.mp3',
          playing: true,
          loop: true,
          volume: 1.0
        })
        engine.removeSystem(sys)
      }
    } else {
      engine.removeSystem(sys)
    }
  }
  engine.addSystem(sys)
}

export function fadeOutTransition(durationSec: number) {
  if (!transitionSoundEntity || !AudioSource.has(transitionSoundEntity)) return
  const target = transitionSoundEntity
  const startVol = AudioSource.get(target).volume ?? 1
  let elapsed = 0
  const sys = (dt: number) => {
    elapsed += dt
    const k = Math.min(1, elapsed / durationSec)
    const v = Math.max(0, startVol * (1 - k))
    if (AudioSource.has(target)) {
      const mut = AudioSource.getMutable(target)
      mut.volume = v
      if (k >= 1) {
        mut.playing = false
        AudioSource.stopSound(target)
        mut.volume = 0
        engine.removeSystem(sys)
      }
    } else {
      engine.removeSystem(sys)
    }
  }
  engine.addSystem(sys)
}

export function fadeOutAndPlayMainBefore() {
  if (!introSoundEntity) return

  
  let elapsed = 0
  let waitingForMainBefore = false
  let waitElapsed = 0
  const duration = 3000 
  const startVolume = 4.0

  const fadeSystem = (dt: number) => {
    if (!waitingForMainBefore) {
      elapsed += dt * 1000 

      if (elapsed < duration && introSoundEntity) {
        
        const currentVolume = startVolume * (1 - elapsed / duration)
        AudioSource.getMutable(introSoundEntity).volume = currentVolume
      } else {
        
        if (introSoundEntity) {
          AudioSource.getMutable(introSoundEntity).playing = false
          AudioSource.stopSound(introSoundEntity)
        }
        waitingForMainBefore = true
        elapsed = 0
      }
    } else {
      
      waitElapsed += dt * 1000

      if (waitElapsed >= 2000) {
        
        mainBeforeSoundEntity = engine.addEntity()
        Transform.create(mainBeforeSoundEntity, {
          position: Vector3.create(0, 0, 0)
        })
        AudioSource.create(mainBeforeSoundEntity, {
          audioClipUrl: 'assets/sounds/main before.mp3',
          playing: true,
          loop: true,
          volume: 6.8
        })

        
        engine.removeSystem(fadeSystem)
      }
    }
  }

  engine.addSystem(fadeSystem)
}


let introSoundEntity: Entity | null = null

export function playIntroSound() {
  if (introSoundEntity) return 

  introSoundEntity = engine.addEntity()
  Transform.create(introSoundEntity, {
    position: Vector3.create(0, 0, 0)
  })

  
  AudioSource.create(introSoundEntity, {
    audioClipUrl: 'assets/sounds/intro.mp3',
    playing: true,
    loop: true,
    volume: 4.0
  })
}

export function main() {
    ReactEcsRenderer.setUiRenderer(UIMenu)

  
  playIntroSound()

  
  let movingWatchBound = false
  let movingEntity: Entity | null = null
  let lastPos: Vector3 | null = null
  let wasMoving = false
  const moveSys = (dt: number) => {
    if (!movingEntity) {
      
      const candidate = 626 as unknown as Entity
      if (Transform.has(candidate)) {
        movingEntity = candidate
      }
      
      if (!movingEntity) {
        for (const [e, name] of engine.getEntitiesWith(Name)) {
          if (name.value.toLowerCase().includes('ring') || name.value.toLowerCase().includes('trigger area')) {
            
            movingEntity = e
            break
          }
        }
      }
      if (!movingEntity) return
    }
    if (!Transform.has(movingEntity)) return
    const pos = Transform.get(movingEntity).position
    if (!lastPos) {
      lastPos = Vector3.create(pos.x, pos.y, pos.z)
      return
    }
    const dx = pos.x - lastPos.x
    const dy = pos.y - lastPos.y
    const dz = pos.z - lastPos.z
    const distSq = dx * dx + dy * dy + dz * dz
    const movingNow = distSq > 0.0004 
    if (movingNow && !wasMoving && !showWhiteScreen) {
      triggerWhiteScreenNow()

      
      let stopElapsed = 0
      const stopSys = (dt: number) => {
        stopElapsed += dt
        if (stopElapsed >= 1) {
          const targets: Array<{ entity: Entity; start: number }> = []
          for (const [e, s] of engine.getEntitiesWith(AudioSource)) {
            const url = (s as any).audioClipUrl as string | undefined
            if (!url) continue
            const lower = url.toLowerCase()
            if (lower.includes('main before.mp3') || lower.includes('after_well.mp3')) {
              targets.push({ entity: e, start: s.volume ?? 1 })
            }
          }

          if (targets.length > 0) {
            let fadeElapsed = 0
            const durationSec = 4
            const fadeSys = (dt2: number) => {
              fadeElapsed += dt2
              const k = Math.min(1, fadeElapsed / durationSec)
              const factor = 1 - k
              for (const t of targets) {
                if (!AudioSource.has(t.entity)) continue
                const mut = AudioSource.getMutable(t.entity)
                mut.volume = Math.max(0, t.start * factor)
                if (k >= 1) {
                  mut.playing = false
                  AudioSource.stopSound(t.entity)
                  mut.volume = 0
                }
              }
              if (fadeElapsed >= durationSec) {
                engine.removeSystem(fadeSys)
              }
            }
            engine.addSystem(fadeSys)
          }
          engine.removeSystem(stopSys)
        }
      }
      engine.addSystem(stopSys)

      
      let transElapsed = 0
      const transSys = (dt: number) => {
        transElapsed += dt
        if (transElapsed >= 7) {
          transitionSoundEntity = engine.addEntity()
          Transform.create(transitionSoundEntity, { position: Vector3.create(0, 0, 0) })
          AudioSource.create(transitionSoundEntity, {
            audioClipUrl: 'assets/sounds/transition.mp3',
            playing: true,
            loop: true,
            volume: 1.0
          })
          engine.removeSystem(transSys)
        }
      }
      engine.addSystem(transSys)

      
      let whiteTextElapsed = 0
      const whiteTextSys = (dt: number) => {
        whiteTextElapsed += dt
        if (whiteTextElapsed >= 19) {
          whiteScreenTextVisible = true
          ReactEcsRenderer.setUiRenderer(UIMenu)
          engine.removeSystem(whiteTextSys)
        }
      }
      engine.addSystem(whiteTextSys)

      
      engine.removeSystem(moveSys)
      movingWatchBound = true
    }
    wasMoving = movingNow
    lastPos = Vector3.create(pos.x, pos.y, pos.z)
  }
  engine.addSystem(moveSys)

  
  let tealDone = false
  const tealSys = (dt: number) => {
    const teal = engine.getEntityOrNullByName(EntityNames.Teal_Tree_Bulb) || engine.getEntityOrNullByName('Teal Tree Bulb')
    if (teal && Transform.has(teal)) {
      const t = Transform.getMutable(teal)
      t.position = Vector3.create(18.09, 0.16, 26.11)
      tealDone = true
    }
    if (tealDone) engine.removeSystem(tealSys)
  }
  engine.addSystem(tealSys)

    const light = engine.addEntity()
    Transform.create(light, {
        position: Vector3.create(39.82, 2.25, 33.53)
    })
    LightSource.create(light, {
        type: LightSource.Type.Point({}),
        color: Color3.create(0, 0.8, 0.4),
        intensity: 18000,
        range: 300
    })
    const zone = engine.addEntity()
    Transform.create(zone, {
        position: Vector3.create(0, 0, 0) 
    })
    CameraModeArea.create(zone, {
        area: Vector3.create(158, 60, 158),
        mode: CameraType.CT_FIRST_PERSON
    })
    InputModifier.create(engine.PlayerEntity, {
    mode: InputModifier.Mode.Standard({ disableAll: false, disableJump: true, disableRun: true, disableWalk: false, disableEmote: true, disableJog: true })
  })

  
  const wellTriggerZone = engine.addEntity()
  Transform.create(wellTriggerZone, {
    position: Vector3.create(64.54, 0.1, 15.83), 
    
    scale: Vector3.create(160, 7, 1)
  })
  MeshRenderer.setPlane(wellTriggerZone)
  MeshCollider.setPlane(wellTriggerZone, ColliderLayer.CL_POINTER)
  Material.setPbrMaterial(wellTriggerZone, {
    albedoColor: Color4.create(0.5, 0.8, 1, 0), 
    castShadows: false,
    roughness: 0.5,
    metallic: 0
  })

  
  let previousBlackState = false
  let previousWhiteState = false
  let previousBlackTextState = false
  let previousWhiteTextState = false
  let previousBlackButtonState = false
  let wellOriented = false
  let wellMovedCloser = false
  let wellYaw: number | null = null
  let screenTriggered = false

  engine.addSystem((dt) => {
    
    if (showBlackScreen) {
      if (blackScreenAlpha < 1) {
        blackScreenAlpha = Math.min(1, blackScreenAlpha + dt / blackScreenFadeDurationSec)
        
        blackScreenTextVisible = false
        blackScreenTextDelayActive = false
        blackScreenTextDelayElapsedMs = 0
      } else {
        if (!blackScreenTextVisible) {
          if (!blackScreenTextDelayActive) {
            blackScreenTextDelayActive = true
            blackScreenTextDelayElapsedMs = 0
          } else {
            blackScreenTextDelayElapsedMs += dt * 1000
            if (blackScreenTextDelayElapsedMs >= blackScreenTextDelayMs) {
              blackScreenTextVisible = true
              blackScreenTextDelayActive = false
              blackScreenButtonDelayElapsedMs = 0
            }
          }
        } else {
          if (blackScreenTextVisible && !blackScreenButtonVisible) {
            if (!blackScreenButtonDelayActive) {
              blackScreenButtonDelayActive = true
              blackScreenButtonDelayElapsedMs = 0
            } else {
              blackScreenButtonDelayElapsedMs += dt * 1000
              if (blackScreenButtonDelayElapsedMs >= blackScreenButtonDelayMs) {
                blackScreenButtonVisible = true
                blackScreenButtonDelayActive = false
              }
            }
          }
        }
      }
    } else {
      blackScreenAlpha = 0
      blackScreenTextVisible = false
      blackScreenTextDelayActive = false
      blackScreenTextDelayElapsedMs = 0
      blackScreenButtonVisible = false
      blackScreenButtonDelayActive = false
      blackScreenButtonDelayElapsedMs = 0
    }

    
    if (showWhiteScreen) {
      if (whiteScreenAlpha < 1) {
        whiteScreenAlpha = Math.min(1, whiteScreenAlpha + dt / whiteScreenFadeDurationSec)
      }
    } else {
      whiteScreenAlpha = 0
    }

    if (lastAlphaNotified !== blackScreenAlpha || lastWhiteAlphaNotified !== whiteScreenAlpha) {
      lastAlphaNotified = blackScreenAlpha
      lastWhiteAlphaNotified = whiteScreenAlpha
      ReactEcsRenderer.setUiRenderer(UIMenu)
    }
    
    if (showBlackScreen !== previousBlackState || blackScreenTextVisible !== previousBlackTextState || blackScreenButtonVisible !== (previousBlackButtonState || false)) {
      previousBlackState = showBlackScreen
      previousBlackTextState = blackScreenTextVisible
      previousBlackButtonState = blackScreenButtonVisible
      ReactEcsRenderer.setUiRenderer(UIMenu)
    }
    
    if (showWhiteScreen !== previousWhiteState || whiteScreenTextVisible !== previousWhiteTextState) {
      previousWhiteState = showWhiteScreen
      previousWhiteTextState = whiteScreenTextVisible
      ReactEcsRenderer.setUiRenderer(UIMenu)
    }
    
    if (objectMessageVisible) {
      objectMessageTimer += dt
      if (objectMessageTimer >= objectMessageDuration) {
        objectMessageVisible = false
        objectMessageTimer = 0
        ReactEcsRenderer.setUiRenderer(UIMenu)
      }
    }

    
    if (!ringEntity) {
      
      for (const [entity, name] of engine.getEntitiesWith(Name)) {
        const nameStr = name.value
        
        if (nameStr.includes('ring.glb_5') || (nameStr.includes('ring.glb') && nameStr.includes('5'))) {
          ringEntity = entity
          setRingEntity(entity)
          break
        }
      }
      
      if (!ringEntity) {
        for (const [entity, gltf] of engine.getEntitiesWith(GltfContainer)) {
          if (gltf.src.includes('ring')) {
            ringEntity = entity
            setRingEntity(entity)
            break
          }
        }
      }
      
      if (!ringEntity) {
        const cand = 616 as unknown as Entity
        if (Transform.has(cand)) ringEntity = cand
      }
      if (!ringEntity) {
        const cand = 618 as unknown as Entity
        if (Transform.has(cand)) ringEntity = cand
      }
    }

    
    if (ringEntity && Transform.has(ringEntity)) {
      const zoneT = Transform.getMutable(wellTriggerZone)
      const ringPos0 = Transform.get(ringEntity).position
      const dx0 = ringPos0.x - zoneT.position.x
      const dz0 = ringPos0.z - zoneT.position.z

      if (!wellOriented) {
        const yaw = Math.atan2(dx0, dz0)
        const half = yaw / 2
        zoneT.rotation = { x: 0, y: Math.sin(half), z: 0, w: Math.cos(half) }
        wellYaw = yaw
        wellOriented = true
      }

      if (!wellMovedCloser) {
        const len = Math.sqrt(dx0 * dx0 + dz0 * dz0)
        if (len > 0.0001) {
          const nx = dx0 / len
          const nz = dz0 / len
          zoneT.position = Vector3.create(zoneT.position.x + nx * 3.0, zoneT.position.y, zoneT.position.z + nz * 3.0)
        }
        wellMovedCloser = true
      }
    }

    
    if (!ringEntity || !Transform.has(ringEntity)) return

    const zoneNow = Transform.get(wellTriggerZone)
    const ringPos = Transform.get(ringEntity).position

    
    if (wellYaw !== null) {
      const dx = ringPos.x - zoneNow.position.x
      const dz = ringPos.z - zoneNow.position.z
      const cosA = Math.cos(-wellYaw)
      const sinA = Math.sin(-wellYaw)
      const localX = dx * cosA - dz * sinA
      const localZ = dx * sinA + dz * cosA

      const halfWidth = (zoneNow.scale?.x ?? 160) / 2
      const halfDepth = (zoneNow.scale?.z ?? 1) / 2
      const inside = Math.abs(localX) <= halfWidth && Math.abs(localZ) <= halfDepth

      if (inside && !screenTriggered) {
        setBlackScreen(true)
        screenTriggered = true
      }
    }

    })

  // Place ASSET_1761732874_3276668 at (25, 1, 49)
  const asset3276668 = engine.addEntity()
  Transform.create(asset3276668, { position: Vector3.create(25, 1, 49) })
  GltfContainer.create(asset3276668, { src: 'assets/scene/Models/ASSET_1761732874_3276668.glb' })
  Name.create(asset3276668, { value: 'ASSET_1761732874_3276668' })

  // Add white point light near the asset
  const assetLight = engine.addEntity()
  Transform.create(assetLight, { position: Vector3.create(25, 1, 49) })
  LightSource.create(assetLight, {
    type: LightSource.Type.Point({}),
    color: Color3.create(1, 1, 1),
    intensity: 6232,
    range: 60
  })

  // Rotate the asset around its vertical axis at 0.5 rpm
  let assetAngle = 0
  const rotateSys = (dt: number) => {
    if (!Transform.has(asset3276668)) return
    assetAngle += dt * (Math.PI / 60) // π rad/min => π/60 rad/sec
    const half = assetAngle * 0.5
    const mut = Transform.getMutable(asset3276668)
    mut.rotation = { x: 0, y: Math.sin(half), z: 0, w: Math.cos(half) }
  }
  engine.addSystem(rotateSys)
}
