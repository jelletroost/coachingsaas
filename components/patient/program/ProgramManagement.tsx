"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Calendar,
   CheckCircle,
   Clock,
   Target,
   TrendingUp,
   Trophy,
} from "lucide-react";
import { useState } from "react";
import { goalsData, milestonesData, programData } from "./mockData";

export function ProgramManagement() {
   const [activeTab, setActiveTab] = useState("overview");

   return (
      <div className="space-y-6">
         {/* Program Header */}
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-2xl font-bold">{programData.name}</h2>
               <p className="text-muted-foreground">
                  {programData.description}
               </p>
            </div>
            <Badge variant="outline" className="text-sm">
               {programData.status}
            </Badge>
         </div>

         {/* Program Stats */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Program Progress
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {programData.progress}%
                  </div>
                  <Progress value={programData.progress} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                     {programData.completedWeeks} of {programData.totalWeeks}{" "}
                     weeks
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Goals Completed
                  </CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold">
                     {
                        goalsData.filter(
                           (g: { status: string }) => g.status === "completed"
                        ).length
                     }
                     /{goalsData.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     Health goals achieved
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                     Next Milestone
                  </CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <div className="text-sm font-medium">
                     {milestonesData.find(
                        (m: { status: string }) => m.status === "upcoming"
                     )?.title || "All completed!"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                     {milestonesData.find(
                        (m: { status: string }) => m.status === "upcoming"
                     )?.description || "Great job!"}
                  </p>
               </CardContent>
            </Card>
         </div>

         {/* Tabs */}
         <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
               <TabsTrigger value="overview">Overview</TabsTrigger>
               <TabsTrigger value="goals">Goals</TabsTrigger>
               <TabsTrigger value="milestones">Milestones</TabsTrigger>
               <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Program Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div>
                        <h4 className="font-medium mb-2">About This Program</h4>
                        <p className="text-sm text-muted-foreground">
                           {programData.overview}
                        </p>
                     </div>
                     <div>
                        <h4 className="font-medium mb-2">
                           What You&apos;ll Learn
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                           {programData.learningOutcomes.map(
                              (outcome: string, index: number) => (
                                 <li
                                    key={index}
                                    className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                    <span>{outcome}</span>
                                 </li>
                              )
                           )}
                        </ul>
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goalsData.map(
                     (goal: {
                        id: string;
                        title: string;
                        description: string;
                        status: string;
                        progress: number;
                        dueDate: string;
                     }) => (
                        <Card key={goal.id}>
                           <CardHeader>
                              <div className="flex items-center justify-between">
                                 <CardTitle className="text-lg">
                                    {goal.title}
                                 </CardTitle>
                                 <Badge
                                    variant={
                                       goal.status === "completed"
                                          ? "default"
                                          : goal.status === "in-progress"
                                          ? "secondary"
                                          : "outline"
                                    }>
                                    {goal.status}
                                 </Badge>
                              </div>
                           </CardHeader>
                           <CardContent>
                              <p className="text-sm text-muted-foreground mb-3">
                                 {goal.description}
                              </p>
                              {goal.progress !== undefined && (
                                 <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                       <span>Progress</span>
                                       <span>{goal.progress}%</span>
                                    </div>
                                    <Progress value={goal.progress} />
                                 </div>
                              )}
                              <div className="flex items-center space-x-2 mt-3 text-xs text-muted-foreground">
                                 <Calendar className="h-3 w-3" />
                                 <span>Due: {goal.dueDate}</span>
                              </div>
                           </CardContent>
                        </Card>
                     )
                  )}
               </div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-4">
               <div className="space-y-4">
                  {milestonesData.map(
                     (milestone: {
                        id: string;
                        title: string;
                        description: string;
                        status: string;
                        week: number;
                        achievedDate?: string;
                     }) => (
                        <Card key={milestone.id}>
                           <CardContent className="pt-6">
                              <div className="flex items-start space-x-4">
                                 <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                       milestone.status === "completed"
                                          ? "bg-green-100 text-green-800"
                                          : milestone.status === "upcoming"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-gray-100 text-gray-800"
                                    }`}>
                                    {milestone.status === "completed" ? (
                                       <CheckCircle className="h-5 w-5" />
                                    ) : (
                                       <Clock className="h-5 w-5" />
                                    )}
                                 </div>
                                 <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                       <h3 className="font-medium">
                                          {milestone.title}
                                       </h3>
                                       <Badge
                                          variant={
                                             milestone.status === "completed"
                                                ? "default"
                                                : milestone.status ===
                                                  "upcoming"
                                                ? "secondary"
                                                : "outline"
                                          }>
                                          {milestone.status}
                                       </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                       {milestone.description}
                                    </p>
                                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                                       <span>Week {milestone.week}</span>
                                       {milestone.achievedDate && (
                                          <span>
                                             Achieved: {milestone.achievedDate}
                                          </span>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     )
                  )}
               </div>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {programData.weeklySchedule.map(
                           (
                              week: {
                                 week: number;
                                 activities: {
                                    title: string;
                                    completed: boolean;
                                 }[];
                              },
                              index: number
                           ) => (
                              <div
                                 key={index}
                                 className="border rounded-lg p-4">
                                 <h4 className="font-medium mb-2">
                                    Week {week.week}
                                 </h4>
                                 <div className="space-y-2">
                                    {week.activities.map(
                                       (
                                          activity: {
                                             title: string;
                                             completed: boolean;
                                          },
                                          actIndex: number
                                       ) => (
                                          <div
                                             key={actIndex}
                                             className="flex items-center space-x-3">
                                             <div
                                                className={`w-2 h-2 rounded-full ${
                                                   activity.completed
                                                      ? "bg-green-600"
                                                      : "bg-gray-300"
                                                }`}
                                             />
                                             <span
                                                className={`text-sm ${
                                                   activity.completed
                                                      ? "line-through text-muted-foreground"
                                                      : ""
                                                }`}>
                                                {activity.title}
                                             </span>
                                             {activity.completed && (
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                             )}
                                          </div>
                                       )
                                    )}
                                 </div>
                              </div>
                           )
                        )}
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
}
