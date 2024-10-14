import React from "react";
import ScrollableLayout from "../layouts/ScrollableLayout";
import { BackgroundBeamsWithCollision } from "../components/aceturnity/background-beams-with-collision";
import { Button } from "../components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/shadcn/card";
import { Badge } from "../components/shadcn/badge";
import { AspectRatio } from "../components/shadcn/aspect-ratio";

export const Landing: React.FC = () => {
  return (
    <ScrollableLayout>
      <div className="relative flex flex-col justify-center items-center min-h-[80vh] ">
      <BackgroundBeamsWithCollision className="absolute w-[100vw]">
          <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto">
          <h2 className="text-2xl max-w-4xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            What&apos;s makes your startup{" "}
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span className="">Extraordinary.</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 py-4">
            <span className="">Extraordinary.</span>
            </div>
            </div>
            </h2>
            <p className="text-lg md:text-xl mb-8 ">
              Give a brief description of what your startup does,
              and what makes it so special.
            </p>
            <Button>
              Start free today
            </Button>
            <div className="mt-12 flex items-center justify-center">
              <div className="flex -space-x-2">
                <img src="https://avatars.githubusercontent.com/u/38949593?v=4" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://avatars.githubusercontent.com/u/38949593?v=4" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <img src="https://avatars.githubusercontent.com/u/38949593?v=4" alt="User" className="w-10 h-10 rounded-full border-2 border-white" />
                <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-sm font-bold">
                  5k+
                </div>
              </div>
              <div className="ml-4 flex flex-col justify-center items-start">
                <span className="text-yellow-400">★★★★★</span>
                <span>from 5k+ happy users</span>
              </div>
            </div>
          </div>
        </BackgroundBeamsWithCollision>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">
        Everything you need to understand and optimize your application
      </h1>
      
      <div className="grid grid-cols-5 gap-4 mb-4 max-w-6xl mx-auto">
        <Card className="col-span-3 hover:border-blue-500 ease-in-out">
          <CardHeader>
            <CardTitle>Feature One</CardTitle>
            <CardDescription>
              Describe the first main feature of your product and its benefits.
              <br />
              <Button variant="link" className="p-0">Learn more →</Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 border rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Example Data</span>
                <Badge variant="secondary">Status</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Metric One</span>
                  <span>Value</span>
                </div>
                <div className="flex justify-between">
                  <span>Metric Two</span>
                  <span>Value</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 hover:border-blue-500 ease-in-out">
          <CardHeader>
            <CardTitle>Feature Two</CardTitle>
            <CardDescription>
              Highlight another key feature of your product and explain its importance.
              <br />
              <Button variant="link" className="p-0">Explore feature →</Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 space-y-2">
              <Badge variant="outline">Tag One</Badge>
              <Badge variant="outline">Tag Two</Badge>
              <Badge variant="outline">Tag Three</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
        <div className="col-span-2 space-y-4">
          <Card className="hover:border-blue-500 ease-in-out">
            <CardHeader>
              <CardTitle>Feature Three</CardTitle>
              <CardDescription>
                Describe another important aspect of your product and its capabilities.
                <br/>
                <Button variant="link" className="p-0">Learn more →</Button>
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:border-blue-500 ease-in-out">
            <CardHeader>
              <CardTitle>Technology Highlight</CardTitle>
              <CardDescription>
                Showcase a key technology or framework that powers your product and its advantages.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="col-span-3 hover:border-blue-500 ease-in-out">
          <CardHeader>
            <CardTitle>Feature Four</CardTitle>
            <CardDescription>
              Explain a complex feature or system within your product that sets it apart from competitors.
              <br/>
              <Button variant="link" className="p-0">Discover more →</Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-4 border rounded p-4">
              <div className="text-center text-gray-500">Feature Diagram Placeholder</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto my-16 px-4">
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img 
                src="https://placehold.co/400" 
                alt="Description of the thing" 
                className="w-full aspect-sqaure h-auto object-cover rounded-lg shadow-lg"
            />
        </div>
        <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-center">
            <p className="font-bold text-blue-500">FEATURE INFORMATION HERE</p>
            <h2 className="text-3xl font-bold mb-4">Your Headline Here</h2>
            <p className="text-lg mb-6">
            Your description text goes here. Explain the key features or benefits 
            related to the image on the left. Make it compelling and informative.
            <br/>
            <Button>Call to Action</Button>
            </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row max-w-6xl mx-auto my-16 px-4">
        <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-center">
            <p className="font-bold text-blue-500">FEATURE INFORMATION HERE</p>
            <h2 className="text-3xl font-bold mb-4">Your Headline Here</h2>
            <p className="text-lg mb-6">
            Your description text goes here. Explain the key features or benefits 
            related to the image on the left. Make it compelling and informative.
            <br/>
            <Button>Call to Action</Button>
            </p>
        </div>
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <img 
                src="https://placehold.co/400" 
                alt="Description of the thing" 
                className="w-full aspect-sqaure h-auto object-cover rounded-lg shadow-lg"
            />
        </div>
      </div>
    </ScrollableLayout>
  );
};