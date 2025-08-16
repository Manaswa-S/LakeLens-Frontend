import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { doneTour } from "./FeaturesTour";


export let tourID = 1;

export function playV1() {
    promptTour();
}


function promptTour() {
    const driverObj = driver({
        showProgress: false,
        overlayColor: "#000000",
        overlayOpacity: 0.7,
        onPopoverRender: (popover) => {

            const yesButton = document.createElement("button");
            yesButton.innerText = "Yes";
            popover.footerButtons.appendChild(yesButton);

            yesButton.addEventListener("click", () => {
                driverObj.destroy();
                startTour();
                return;
            });
        },
        steps: [
            {
                popover: {
                    title: 'Take a Quick Product Tour',
                    description: `
                        It'll help you use the product more effectively. 
                        <br> 
                        <strong>You can start the tour anytime from the Help menu.</strong>`,
                    align: 'center',
                    showButtons: [
                        'next',
                        'close'
                    ],
                    nextBtnText: 'No',
                }
            },
        ],

        onDestroyStarted: () => {
            driverObj.destroy();
            doneTour(tourID);
            // responseTour();
        }
    });

    driverObj.drive();
}

function startTour() {

    const driverObj = driver({
        showProgress: true,
        steps: [
            {
                element: '#new-lake-root',
                popover: {
                    title: 'Create a New Lake',
                    description: 'Add a new data lake to begin exploring your data.',
                    side: "bottom",
                    align: 'end'
                }
            },
            {
                element: '#settings-root',
                popover: {
                    title: 'Customize Your Experience',
                    description: 'Manage preferences, themes, and advanced options.',
                    side: "bottom",
                    align: 'end',
                }
            },
            {
                element: '#profile-root',
                popover: {
                    title: 'Your Profile',
                    description: 'Access your profile, collaboration tools, socials, billing, and more.',
                    side: "bottom",
                    align: 'end',
                }
            },
            {
                element: '#sidebar-projects-root',
                popover: {
                    title: 'Your Projects & Lakes',
                    description: 'Browse all lakes, manage them, and perform key actions easily.',
                    side: "right",
                    align: 'start',
                }
            },
            {
                element: '#mainarea-root',
                popover: {
                    title: 'Interactive Cards',
                    description: 'Drag and resize cards to personalize your layout.',
                    side: 'over',
                    align: 'start',
                }
            },
        ],

        onDestroyStarted: () => {
            driverObj.destroy();
            doneTour(tourID);
        }
    });

    driverObj.drive();
}


function responseTour() {
    const driverObj = driver({
        showProgress: false,
        overlayColor: "#dfd7f5",
        overlayOpacity: 0.5,
        steps: [
            {
                popover: {
                    title: 'Tour Skipped',
                    description: `You can start the tour anytime from the Help menu.`,
                    align: 'center',
                    showButtons: [
                        'next',
                        'close'
                    ],
                    nextBtnText: 'Ok',
                    onNextClick: () => {
                        driverObj.destroy();
                    }
                }
            },
        ]
    });

    driverObj.drive();
}