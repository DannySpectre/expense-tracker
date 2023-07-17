"use client";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabaseClient";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //declare inputvariables for form fields
  const [userId, setUserId] = useState();
  const [amount, setAmount] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.getUser();
      if (user) {
        const userID = user.data.user.id;
        setIsAuthenticated(true);
        setUserId(userID);
      }
    };
    getUser();
  }, []);

  const addNewIncome = async () => {
    try {
      if (userId && amount && description && date) {
        const { data, error } = await supabase.from("income").insert({
          user_id: userId,
          amount: amount,
          description: description,
          date: date,
        });
        if (error) throw error;
        console.log("data ", data);
      }
    } catch {
      error;
    }
    {
      console.log(error);
    }
  };

  return (
    <div>
      {isAuthenticated && (
        <>
          <div className="flex justify-center items-center mt-6">
            <h1 className="text-3xl font-bold">
              Welcome to your Financial Calendar
            </h1>
          </div>

          <div className="flex justify-center items-center mt-6 gap-4">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
            <Tabs defaultValue="Income" className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="Income">Income</TabsTrigger>
                <TabsTrigger value="Expense">Expense</TabsTrigger>
              </TabsList>
              <TabsContent value="Income">
                <Card>
                  <CardHeader>
                    <CardTitle>Income</CardTitle>
                    <CardDescription>Add income earned.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="ammount">Amount</Label>
                      <Input id="income_amount" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Input id="income_description" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Add Income</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="Expense">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense</CardTitle>
                    <CardDescription>
                      Add any expenses incourred.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="ammount">Amount</Label>
                      <Input id="expense_amount" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Input id="expense_description" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Add Expense</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
}
