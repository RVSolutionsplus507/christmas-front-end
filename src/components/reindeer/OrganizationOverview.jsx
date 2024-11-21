import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CirclePlus } from "lucide-react";
import { ChristmasSantaSleight } from "@/components/global/iconsChristmas";
import OrganizationComboBox from "@/components/reindeer/OrganizationComboBox";

export default function OrganizationOverview({
  data: { organizationsData, reindeersData },
  visualizerOrganizationState: {
    visualizerOrganization: { previewOrganization, selectedOrganization },
    setVisualizerOrganization,
  },
  setModalState,
  updateCheckedReindeersOrganization,
}) {

    previewOrganization?.isSelected == undefined &&
    setVisualizerOrganization((prevState) => ({
      ...prevState,
      previewOrganization: organizationsData.find(
        (organization) => organization.isSelected == true
      ),
    }));

  const availableOrganizations = organizationsData.filter(
    (organization) => organization.isAvailable
  );

  return (
    <Card>
      <div className="h-full flex flex-col justify-evenly box-border">
        {previewOrganization ? (
          <>
            <CardHeader>
              <CardTitle>Organization overview</CardTitle>
              <CardDescription>
                View the real-time organization of Santa&apos;s sleigh team.
                This dashboard displays the current positions of each reindeer,
                making it easy to plan and oversee the holiday crew. Ensure
                everyone is in the right spot for a flawless takeoff.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-5 w-full gap-3 lg:flex-row">
              <ChristmasSantaSleight />
              <div className="flex flex-col w-1/2 gap-5">
                <h3 className="ml-5 text-center font-semibold">
                  {`${previewOrganization.name} Reindeers 🦌`}
                </h3>
                <div className="grid grid-cols-3 gap-3 place-items-center">
                  {previewOrganization.positions.map(
                    ({ position, reindeer }) => (
                      <Card key={position} className="p-2 rounded-sm">
                        <CardTitle>
                          {reindeersData.find(({ id }) => id == reindeer).name}
                        </CardTitle>
                      </Card>
                    )
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              {!previewOrganization.isSelected && (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    const updatedOrganizations = organizationsData.map(
                      (organization) => ({
                        ...organization,
                        isSelected:
                          organization.id === previewOrganization.id
                            ? true
                            : false,
                      })
                    );
                    updateCheckedReindeersOrganization(updatedOrganizations);
                    setVisualizerOrganization((prevState) => ({
                      ...prevState,
                      previewOrganization: null,
                    }));
                  }}
                >
                  <Check /> Select {previewOrganization.name}
                </Button>
              )}
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Choose an organization</CardTitle>
              <CardDescription>
                Select or create an organization to view its details and
                reindeer team arrangements. Once chosen, the team positions and
                availability will be displayed for your review
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-5 w-full gap-3 lg:flex-row">
              <ChristmasSantaSleight />
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center gap-3 lg:flex-row">
              <Button
                variant="outline"
                onClick={() =>
                  setModalState({ isOpen: true, organizationData: null })
                }
              >
                <CirclePlus /> New organization
              </Button>
              {organizationsData.length > 0 &&
                availableOrganizations.length > 0 && (
                  <OrganizationComboBox
                    data={availableOrganizations}
                    setVisualizerOrganization={setVisualizerOrganization}
                  />
                )}
            </CardFooter>
          </>
        )}
      </div>
    </Card>
  );
}
