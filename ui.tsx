import  { ReactEcs,UiEntity, ReactEcsRenderer } from "@dcl/sdk/react-ecs"
import { Color4 } from "@dcl/sdk/math"
import { engine } from "@dcl/sdk/ecs"
import { getBlackScreen, hideBlackScreenAndRemoveRing, fadeOutAndPlayMainBefore, getBlackScreenAlpha, getBlackScreenTextVisible, getBlackScreenButtonVisible, fadeOutMainBefore, hideBlackScreenAfter, getWhiteScreen, getWhiteScreenAlpha, getWhiteScreenTextVisible, getWhiteScreenSecondTextVisible, showWhiteSecondText, getWhiteScreenThirdTextVisible, showWhiteThirdText, getWhiteScreenChoiceVisible, showWhiteChoice, fadeOutTransition, getWhiteScreenImageVisible, showWhiteImage, startLeftButtonSequence, getWhiteScreenRightImageVisible, showWhiteRightImage, startRightButtonSound, getRightImageConversationStageVisible, showRightImageConversationStage, getRightImageCodeStageVisible, showRightImageCodeStage, getRightImageFinalStageVisible, showRightImageFinalStage, goToGenesis00, getRightImageCodeUIVisible, showInitialWarning, getInitialWarningVisible, hideInitialWarningNow, getObjectMessageVisible, getObjectMessageText } from "./index"

let uiVisible = true
let lightButtonHidden = false

export const hideUI = () => {
    uiVisible = false
    ReactEcsRenderer.setUiRenderer(UIMenu)
}

export const UIMenu = () => {
    const blackScreenVisible = getBlackScreen()
    const whiteScreenVisible = getWhiteScreen()
    
    
    if (whiteScreenVisible) {
        const alpha = getWhiteScreenAlpha()
        const showWhiteText = getWhiteScreenTextVisible()
        const showWhiteText2 = getWhiteScreenSecondTextVisible()
        const showWhiteText3 = getWhiteScreenThirdTextVisible()
        const showChoice = getWhiteScreenChoiceVisible()
        const showImage = getWhiteScreenImageVisible()
        const showRightImage = getWhiteScreenRightImageVisible()
        return (
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: '100%',
                    positionType: 'absolute',
                    position: { top: 0, left: 0 }
                }}
                uiBackground={{ color: Color4.create(1, 1, 1, alpha) }}
            >
                {showWhiteText && !showWhiteText2 && !showChoice && (
                    <UiEntity
                        uiTransform={{
                            width: '70%',
                            margin: { top: '32%', left: '15%' }
                        }}
                        uiText={{
                            value: `Despite the surrounding environment and this hallucination?Due to severe mental shock...\n\nYou have never experienced even a similar state (strong confusion and extreme confusion do not allow You to clearly assess the situation).Lack of confidence in the ability to distinguish the "real" from the illusory.You not sure that all this is really happening.Blurring the boundaries of "reality".As if You have lost some control over your thoughts and the ability to understand of most from them.Also there is no ability to accurately identify one's feelings, sensations.It's like You've started experiencing new things but can't figure out what it means`,
                            fontSize: 22,
                            color: Color4.Black(),
                            textAlign: 'top-center'
                        }}
                    />
                )}
                {showWhiteText2 && !showWhiteText3 && !showChoice && (
                    <UiEntity
                        uiTransform={{
                            width: '70%',
                            margin: { top: '32%', left: '15%' }
                        }}
                        uiText={{
                            value: `You feel like You don't want to go anywhere,as if You were caught in a warm stream after a cold and sharp wind.
After some time, You begin to understand that this Entity begins to interact with You...
Not in the usual way with voice and sound waves, but rather telepathically,not a single sound was uttered, but You understand very clearly that this Entity is greeting You,and You feel the tranquility that You have never experienced before

After some time it becomes clear that this Entity is not material.Usually It exists in one of the countless dimensions invisible to human eyes.Then it becomes clear that once upon a time She had a biological,material form(countless times and completely different).In various incarnations, He lived in the oceans, She had wings, and much more...The interaction was not like the slow transfer of information available to Humanity.It felt like information was coming at You from all sides at once.Limited human perception, Reason did not grasp all the meanings from what was received.You couldn't process these streams of information that were overwhelming your Mind.Much was forgotten`,
                            fontSize: 22,
                            color: Color4.Black(),
                            textAlign: 'top-center'
                        }}
                    />
                )}
                {showWhiteText3 && !showChoice && (
                    <UiEntity
                        uiTransform={{
                            width: '70%',
                            margin: { top: '32%', left: '15%' }
                        }}
                        uiText={{
                            value: `The Entity also transferred that for certain reasons was stuck in a certain small space and cannot continue its natural cycles of life and death.The Entity shared thoughts that premature methods of contact could be unpleasant and even dangerous for You.Partly this is due to the difference in your frequencies.The Entity warned You.This island and not only is full of hidden powers right now.Not all of them are "friendly" towards you.Many forces are taking advantage of You(using of different subjects).Many provoke You to various low-frequency emotions(fear, anger, resentment and other "negative").Invisible forces feed on these energies and try to keep You at low frequencies.In particular, on this island, with their help, You could experience unpleasant emotions, fear and disgust.Often They (and contacts with them) are dangerous, and sometimes very dangerous!But the truth is that You can be in high frequencies(state of joy/happiness, love, inspiration, compassion and others).Usually in human culture these emotions/states are called positive.

You then realized that due to a coincidence and some of the artifacts hidden or placed on this island,You have acquired or charged yourself with certain energies.Thus, the potential accumulated was sufficient for the transition to other dimensions.And the Entity can provide practical assistance free  to activate the transition...`,
                            fontSize: 22,
                            color: Color4.Black(),
                            textAlign: 'top-center'
                        }}
                    />
                )}
                {showWhiteText3 && !showChoice && (
                    <UiEntity
                        uiTransform={{
                            width: '12%',
                            height: '5%',
                            positionType: 'absolute',
                            position: { bottom: '2%', left: '50%' },
                            margin: { left: '-6%' }
                        }}
                        uiBackground={{ color: Color4.Black() }}
                    >
                        <UiEntity
                            uiTransform={{
                                width: '96%',
                                height: '92%',
                                positionType: 'absolute',
                                position: { top: '4%', left: '2%' }
                            }}
                            uiBackground={{ color: Color4.White() }}
                            onMouseDown={() => {
                                
                                fadeOutTransition(3)
                                showWhiteChoice()
                                ReactEcsRenderer.setUiRenderer(UIMenu)
                            }}
                            uiText={{
                                value: 'next',
                                fontSize: 20,
                                color: Color4.Black(),
                                textAlign: 'middle-center'
                            }}
                        />
                    </UiEntity>
                )}
                {showChoice && !showImage && (
                    <UiEntity
                        uiTransform={{
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <UiEntity
                            uiTransform={{
                                width: '80%',
                                margin: { top: '20%', left: '10%' }
                            }}
                            uiText={{
                                value: `What will you choose?`,
                                fontSize: 28,
                                color: Color4.Black(),
                                textAlign: 'top-center'
                            }}
                        />
                        <UiEntity
                            uiTransform={{
                                width: '30%',
                                height: '6%',
                                positionType: 'absolute',
                                position: { top: '55%', left: '10%' }
                            }}
                            uiBackground={{ color: Color4.Black() }}
                        >
                        <UiEntity
                                uiTransform={{
                                    width: '98%',
                                    height: '93%',
                                    positionType: 'absolute',
                                    position: { top: '3%', left: '1%' }
                                }}
                                uiBackground={{ color: Color4.White() }}
                            onMouseDown={() => {
                                
                                showWhiteImage()
                                startLeftButtonSequence()
                                ReactEcsRenderer.setUiRenderer(UIMenu)
                            }}
                                uiText={{
                                    value: 'using the accumulated energy for yourself',
                                    fontSize: 18,
                                    color: Color4.Black(),
                                    textAlign: 'middle-center'
                                }}
                            />
                        </UiEntity>
                        <UiEntity
                            uiTransform={{
                                width: '30%',
                                height: '6%',
                                positionType: 'absolute',
                                position: { top: '55%', right: '10%' }
                            }}
                            uiBackground={{ color: Color4.Black() }}
                        >
                            <UiEntity
                                uiTransform={{
                                    width: '98%',
                                    height: '93%',
                                    positionType: 'absolute',
                                    position: { top: '3%', left: '1%' }
                                }}
                                uiBackground={{ color: Color4.White() }}
                                onMouseDown={() => {
                                    
                                    fadeOutTransition(3)
                                    showWhiteRightImage()
                                    ReactEcsRenderer.setUiRenderer(UIMenu)
                                }}
                                uiText={{
                                    value: 'gaining greater awareness',
                                    fontSize: 18,
                                    color: Color4.Black(),
                                    textAlign: 'middle-center'
                                }}
                            />
                        </UiEntity>
                    </UiEntity>
                )}
                {showImage && (
                    <UiEntity
                        uiTransform={{
                            width: '100%',
                            height: '100%',
                            positionType: 'absolute',
                            position: { top: 0, left: 0 }
                        }}
                        uiBackground={{
                            textureMode: 'stretch',
                            texture: { src: 'assets/images/1000025692.png' }
                        }}
                    >
                        <UiEntity
                            uiTransform={{
                                width: '80%',
                                margin: { top: '8%', left: '10%' }
                            }}
                            uiText={{
                                value: `It seems, Wanderer, that You are now moving along one of the "ego-centered" paths.This is one of the many paths, and this is also a path.But unfortunately or fortunately in this place it is not encouraged`,
                                fontSize: 24,
                                color: Color4.White(),
                                textAlign: 'top-center'
                            }}
                        />
                        <UiEntity
                            uiTransform={{
                                width: '90%',
                                positionType: 'absolute',
                                position: { bottom: '2%', left: '5%' }
                            }}
                            uiText={{
                                value: `If You suddenly want to start over, it is recommended to re-enter the scenes so as not to spoil the atmosphere of the scene, or restart from the stone dragon circle`,
                                fontSize: 18,
                                color: Color4.White(),
                                textAlign: 'bottom-center'
                            }}
                        />
                    </UiEntity>
                )}
                {showRightImage && (
                    <UiEntity
                        uiTransform={{
                            width: '100%',
                            height: '100%',
                            positionType: 'absolute',
                            position: { top: 0, left: 0 }
                        }}
                        uiBackground={{
                            textureMode: 'stretch',
                            texture: { src: 'assets/images/1000025689.png' }
                        }}
                    >
                        { !getRightImageConversationStageVisible() && !getRightImageCodeStageVisible() && (
                            <UiEntity
                                uiTransform={{
                                    width: '85%',
                                    margin: { top: '10%', left: '7.5%' }
                                }}
                                uiText={{
                                    value: `Continuing the telepathic connection, You learned that can help this Entity that has been here on this small piece of space for a very long time.The Entity is very limited here and cannot return to its natural cycle\n\n\n\n\n\nThis will require a voluntary desire to transfer to the Entity the temporary abilities obtained on this island`,
                                    fontSize: 22,
                                    color: Color4.White(),
                                    textAlign: 'top-center'
                                }}
                            />
                        )}
                        { !getRightImageConversationStageVisible() && !getRightImageCodeStageVisible() && (
                            <UiEntity
                                uiTransform={{
                                    width: '100%',
                                    height: '100%',
                                    positionType: 'absolute',
                                    position: { top: 0, left: 0 }
                                }}
                            >
                                <UiEntity
                                    uiTransform={{
                                        width: '20%',
                                        height: '6%',
                                        positionType: 'absolute',
                                        position: { top: '70%', left: '15%' }
                                    }}
                                    uiBackground={{ color: Color4.Black() }}
                                >
                                    <UiEntity
                                        uiTransform={{
                                            width: '98%',
                                            height: '93%',
                                            positionType: 'absolute',
                                            position: { top: '3%', left: '1%' }
                                        }}
                                        uiBackground={{ color: Color4.White() }}
                                        onMouseDown={() => {
                                            showWhiteImage()
                                            startLeftButtonSequence()
                                            ReactEcsRenderer.setUiRenderer(UIMenu)
                                        }}
                                        uiText={{
                                            value: `I don't want to share`,
                                            fontSize: 20,
                                            color: Color4.Black(),
                                            textAlign: 'middle-center'
                                        }}
                                    />
                                </UiEntity>
                                <UiEntity
                                    uiTransform={{
                                        width: '20%',
                                        height: '6%',
                                        positionType: 'absolute',
                                        position: { top: '70%', right: '15%' }
                                    }}
                                    uiBackground={{ color: Color4.Black() }}
                                >
                                    <UiEntity
                                        uiTransform={{
                                            width: '98%',
                                            height: '93%',
                                            positionType: 'absolute',
                                            position: { top: '3%', left: '1%' }
                                        }}
                                        uiBackground={{ color: Color4.White() }}
                                        uiText={{
                                            value: `Yes, I want to share some of the energy from this island`,
                                            fontSize: 16,
                                            color: Color4.Black(),
                                            textAlign: 'middle-center'
                                        }}
                                        onMouseDown={() => {
                                            startRightButtonSound()
                                            showRightImageConversationStage()
                                            ReactEcsRenderer.setUiRenderer(UIMenu)
                                        }}
                                    />
                                </UiEntity>
                            </UiEntity>
                        )}
                        { getRightImageConversationStageVisible() && (
                            <UiEntity
                                uiTransform={{
                                    width: '100%',
                                    height: '100%',
                                    positionType: 'absolute',
                                    position: { top: 0, left: 0 }
                                }}
                            >
                                <UiEntity
                                    uiTransform={{
                                        width: '80%',
                                        positionType: 'absolute',
                                        position: { top: '40%', left: '10%' }
                                    }}
                                    uiText={{
                                        value: `You and the Entity had a long conversation, in short, You received waves of gratitude and felt as if You was born again`,
                                        fontSize: 24,
                                        color: Color4.White(),
                                        textAlign: 'top-center'
                                    }}
                                />
                                <UiEntity
                                    uiTransform={{
                                        width: '80%',
                                        positionType: 'absolute',
                                        position: { top: '50%', left: '10%' }
                                    }}
                                    uiText={{
                                        value: `You also remember the short transmission at the end: "there is no death, there is only the process between changes of physical shells"`,
                                        fontSize: 22,
                                        color: Color4.White(),
                                        textAlign: 'top-center'
                                    }}
                                />
                                <UiEntity
                                    uiTransform={{
                                        width: '12%',
                                        height: '5%',
                                        positionType: 'absolute',
                                        position: { bottom: '2%', left: '50%' },
                                        margin: { left: '-6%' }
                                    }}
                                    uiBackground={{ color: Color4.Black() }}
                                >
                                    <UiEntity
                                        uiTransform={{
                                            width: '96%',
                                            height: '92%',
                                            positionType: 'absolute',
                                            position: { top: '4%', left: '2%' }
                                        }}
                                        uiBackground={{ color: Color4.White() }}
                                        onMouseDown={() => {
                                            showRightImageCodeStage()
                                            ReactEcsRenderer.setUiRenderer(UIMenu)
                                        }}
                                        uiText={{
                                            value: 'next',
                                            fontSize: 20,
                                            color: Color4.Black(),
                                            textAlign: 'middle-center'
                                        }}
                                    />
                                </UiEntity>
                            </UiEntity>
                        )}
                        { getRightImageCodeStageVisible() && (
                            <UiEntity
                                uiTransform={{
                                    width: '100%',
                                    height: '100%',
                                    positionType: 'absolute',
                                    position: { top: 0, left: 0 }
                                }}
                            >
                                { !getRightImageFinalStageVisible() && (
                                    <UiEntity
                                        uiTransform={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    >
                                        { getRightImageCodeUIVisible() && (
                                            <UiEntity
                                                uiTransform={{
                                                    width: '80%',
                                                    margin: { top: '18%', left: '10%' }
                                                }}
                                                uiText={{
                                                    value: `save this code for later receipt of free wearable`,
                                                    fontSize: 24,
                                                    color: Color4.White(),
                                                    textAlign: 'top-center'
                                                }}
                                            />
                                        )}
                                        { getRightImageCodeUIVisible() && (
                                            <UiEntity
                                                uiTransform={{
                                                    width: '100%',
                                                    positionType: 'absolute',
                                                    position: { top: '36%', left: 0 }
                                                }}
                                                uiText={{
                                                    value: `34545656789`,
                                                    fontSize: 110,
                                                    color: Color4.White(),
                                                    textAlign: 'top-center'
                                                }}
                                            />
                                        )}
                                        { getRightImageCodeUIVisible() && (
                                            <UiEntity
                                                uiTransform={{
                                                    width: '18%',
                                                    height: '6%',
                                                    positionType: 'absolute',
                                                    position: { top: '55%', left: '50%' },
                                                    margin: { left: '-9%' }
                                                }}
                                                uiBackground={{ color: Color4.Black() }}
                                            >
                                                <UiEntity
                                                    uiTransform={{
                                                        width: '98%',
                                                        height: '93%',
                                                        positionType: 'absolute',
                                                        position: { top: '3%', left: '1%' }
                                                    }}
                                                    uiBackground={{ color: Color4.White() }}
                                                    onMouseDown={() => {
                                                        showRightImageFinalStage()
                                                        ReactEcsRenderer.setUiRenderer(UIMenu)
                                                    }}
                                                    uiText={{
                                                        value: 'to the final',
                                                        fontSize: 20,
                                                        color: Color4.Black(),
                                                        textAlign: 'middle-center'
                                                    }}
                                                />
                                            </UiEntity>
                                        )}
                                    </UiEntity>
                                )}
                                { getRightImageFinalStageVisible() && (
                                    <UiEntity
                                        uiTransform={{
                                            width: '100%',
                                            height: '100%',
                                            positionType: 'absolute',
                                            position: { top: 0, left: 0 }
                                        }}
                                    >
                                        <UiEntity
                                            uiTransform={{
                                                width: '80%',
                                                margin: { top: '18%', left: '10%' }
                                            }}
                                            uiText={{
                                                value: `Thank You, thank You for your attention and time`,
                                                fontSize: 28,
                                                color: Color4.White(),
                                                textAlign: 'top-center'
                                            }}
                                        />
                                        <UiEntity
                                            uiTransform={{
                                                width: '24%',
                                                height: '6%',
                                                positionType: 'absolute',
                                                position: { top: '55%', left: '50%' },
                                                margin: { left: '-12%' }
                                            }}
                                            uiBackground={{ color: Color4.Black() }}
                                        >
                                            <UiEntity
                                                uiTransform={{
                                                    width: '98%',
                                                    height: '93%',
                                                    positionType: 'absolute',
                                                    position: { top: '3%', left: '1%' }
                                                }}
                                                uiBackground={{ color: Color4.White() }}
                                                onMouseDown={() => {
                                                    goToGenesis00()
                                                }}
                                                uiText={{
                                                    value: 'back to Genesis City',
                                                    fontSize: 20,
                                                    color: Color4.Black(),
                                                    textAlign: 'middle-center'
                                                }}
                                            />
                                        </UiEntity>
                                    </UiEntity>
                                )}
                            </UiEntity>
                        )}
                    </UiEntity>
                )}
                {}
                {showWhiteText && !showWhiteText2 && (
                    <UiEntity
                        uiTransform={{
                            width: '12%',
                            height: '5%',
                            positionType: 'absolute',
                            position: { bottom: '2%', left: '50%' },
                            margin: { left: '-6%' }
                        }}
                        uiBackground={{ color: Color4.Black() }}
                    >
                        <UiEntity
                            uiTransform={{
                                width: '96%',
                                height: '92%',
                                positionType: 'absolute',
                                position: { top: '4%', left: '2%' }
                            }}
                            uiBackground={{ color: Color4.White() }}
                            onMouseDown={() => {
                                showWhiteSecondText()
                                ReactEcsRenderer.setUiRenderer(UIMenu)
                            }}
                            uiText={{
                                value: 'next',
                                fontSize: 20,
                                color: Color4.Black(),
                                textAlign: 'middle-center'
                            }}
                        />
                    </UiEntity>
                )}
                {showWhiteText2 && !showWhiteText3 && (
                    <UiEntity
                        uiTransform={{
                            width: '12%',
                            height: '5%',
                            positionType: 'absolute',
                            position: { bottom: '2%', left: '50%' },
                            margin: { left: '-6%' }
                        }}
                        uiBackground={{ color: Color4.Black() }}
                    >
                        <UiEntity
                            uiTransform={{
                                width: '96%',
                                height: '92%',
                                positionType: 'absolute',
                                position: { top: '4%', left: '2%' }
                            }}
                            uiBackground={{ color: Color4.White() }}
                            onMouseDown={() => {
                                showWhiteThirdText()
                                ReactEcsRenderer.setUiRenderer(UIMenu)
                            }}
                            uiText={{
                                value: 'next',
                                fontSize: 20,
                                color: Color4.Black(),
                                textAlign: 'middle-center'
                            }}
                        />
                    </UiEntity>
                )}
            </UiEntity>
        )
    }
    
    
    if (getInitialWarningVisible()) {
        return (
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: '100%',
                    positionType: 'absolute',
                    position: { top: 0, left: 0 }
                }}
                uiBackground={{ color: Color4.create(0.2, 0.2, 0.2, 0.85) }}
            >
                <UiEntity
                    uiTransform={{
                        width: '80%',
                        margin: { top: '10%', left: '10%' }
                    }}
                    uiText={{
                        value: `WARNING: the scene uses quite loud and harsh sounds and visual components that some people may find uncomfortable.If You have health problems or feel mentally unstable, we recommend lowering the volume.For those who want to consciously dive deeper and do not have health problems, we can recommend using headphones that support modern technology.If You want to reload scene, You will lose some of the scene's non-essential features.It is highly recommended: if rebooting-do it staying on the dragon stone, near which You stand.In order not to lose the atmosphere of the scene.For now, You can write about any malfunctions or bugs here: martinenterprising@gmail.com   (or You might want to share a feedback )`,
                        fontSize: 18,
                        color: Color4.White(),
                        textAlign: 'top-center'
                    }}
                />
                <UiEntity
                    uiTransform={{
                        width: '24%',
                        height: '6%',
                        positionType: 'absolute',
                        position: { top: '75%', left: '50%' },
                        margin: { left: '-12%' }
                    }}
                    uiBackground={{ color: Color4.Black() }}
                >
                    <UiEntity
                        uiTransform={{
                            width: '98%',
                            height: '93%',
                            positionType: 'absolute',
                            position: { top: '3%', left: '1%' }
                        }}
                        uiBackground={{ color: Color4.White() }}
                        onMouseDown={() => {
                            hideInitialWarningNow()
                        }}
                        uiText={{
                            value: 'I have read and understand what is written',
                            fontSize: 18,
                            color: Color4.Black(),
                            textAlign: 'middle-center'
                        }}
                    />
                </UiEntity>
            </UiEntity>
        )
    }

    if (blackScreenVisible) {
        const alpha = getBlackScreenAlpha()
        const showText = getBlackScreenTextVisible()
        const showButton = getBlackScreenButtonVisible()
        return (
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: '100%',
                    positionType: 'absolute',
                    position: { top: 0, left: 0 }
                }}
                uiBackground={{ color: Color4.create(0, 0, 0, alpha) }}
            >
                {showText && (
                    <UiEntity
                        uiTransform={{
                            width: '60%',
                            margin: { top: '40%', left: '20%' }
                        }}
                        uiText={{
                            value: `It seems like You lost consciousness, You don't remember all the details of what happened, There a feeling that You had lost touch with time, as if You were outside of time...and your feel of reality loses its significance...`,
                            fontSize: 24,
                            color: Color4.White(),
                            textAlign: 'middle-center'
                        }}
                    />
                )}
                {showButton && !lightButtonHidden && (
    <UiEntity
        uiTransform={{
                            width: '11%',
                            height: '5%',
                            positionType: 'absolute',
                            position: { bottom: '2%', right: '2%' }
                        }}
                        uiBackground={{ color: Color4.create(0.9, 0.9, 0.9, 0.95) }}
                        onMouseDown={() => {
                            lightButtonHidden = true
                            ReactEcsRenderer.setUiRenderer(UIMenu)
                            fadeOutMainBefore(6)
                            hideBlackScreenAfter(15)
                        }}
                        uiText={{
                            value: 'next',
                            fontSize: 20,
                            color: Color4.Black(),
                            textAlign: 'middle-center'
                        }}
                    />
                )}
            </UiEntity>
        )
    }
    
    const objectMessageVisible = getObjectMessageVisible()
    const objectMessageText = getObjectMessageText()
    
    if (objectMessageVisible && objectMessageText) {
        return (
            <UiEntity
                uiTransform={{
                    width: '100%',
                    height: '100%',
                    positionType: 'absolute',
                    position: { top: 0, left: 0 }
                }}
            >
                <UiEntity
                    uiTransform={{
                        width: '70%',
                        positionType: 'absolute',
                        position: { bottom: '25%', left: '50%' },
                        margin: { left: '-35%' }
                    }}
                    uiBackground={{ color: Color4.create(0, 0, 0, 0.75) }}
                >
                    <UiEntity
                        uiTransform={{
                            width: '96%',
                            margin: { top: '2%', left: '2%' }
                        }}
                        uiText={{
                            value: objectMessageText,
                            fontSize: 22,
                            color: Color4.White(),
                            textAlign: 'middle-center'
                        }}
                    />
                </UiEntity>
            </UiEntity>
        )
    }
    
    if (!uiVisible) return null
    
    return (
        <UiEntity
            uiTransform={{
                width: '54%',
                height: '93%',
                margin: { top: '2%', left: '23%' }
            }}
            uiBackground={{ color: Color4.create(0.345, 0.353, 0.459, 0.4) }}
        >
            <UiEntity
                uiTransform={{
                    width: '87%',
                    height: '99%',  
                    margin: '0.5% 5% 5% 3%'
                }}
                uiText={{   
                    value: `About Halloween:
There is a belief that long ago, this day carried more than decorations, costumes, and a special mood.
People say that in ancient times, it held a deeper meaning.
Early humans marked a period called Samhain — a time that symbolized not only the change of seasons, but also the moment when the borders between worlds grew thin.
It was seen as a time of mystical transition — at least for some.
The author does not claim to know how things truly were,
but simply wishes to remind that our way of thinking has changed greatly over the millennia —
it has become far more material.

About this place:
Greetings, wanderer.
Only You know what brings You to this lonely island, surrounded by endless waters — and how You came to be here.
I myself am curious about the mechanism of such an event.
I do not know where this place truly lies, and few do.
In certain circles, some say it exists in a dimension unfamiliar to humankind.
It is whispered that the Ancients once used it as a passage to other worlds.
Now those technologies — and those abilities — have long been forgotten.
Perhaps someone still knows how to find them, hidden within the folds of time…
But that is another story entirely.

Who can say how much truth lies in these tales?
Only You can judge that — with your own experience and your Reason.

So, You are here...
Ah yes — before I forget — many have told me that somewhere here lies the way to the Violet Temple.
Sadly, I no longer remember the details.
If You have time, You may try to search for it.
In any case… take care of yourself, wanderer.

P.S.
You might find it curious that the celestial lights above do not always follow predictable or harmonious way.
This irregular motion appears from an anomaly within the local fabric of space-time surrounding this place.
This realm exists close to the realm of Absolute Chaos, yet far from the Absolute Center of Equilibrium —
a reminder that even the Stars seem uncertain of their paths...`,
                    fontSize: 19,
                    color: Color4.White()
                }}
            />
            <UiEntity
                uiTransform={{
                    width: '11%',
                    height: '5%',
                    positionType: 'absolute',
                    position: { bottom: '2%', right: '2%' }
                }}
                uiBackground={{ color: Color4.create(0.05, 0.05, 0.05, 1) }}
                onMouseDown={() => {
                    fadeOutAndPlayMainBefore()
                    hideUI()
                    // Show initial warning overlay (stays until button is clicked)
                    showInitialWarning()
                }}
                uiText={{
                    value: 'next',
                    fontSize: 20,
                    color: Color4.White(),
                    textAlign: 'middle-center'
                }}
            />
        </UiEntity>
    )
}
