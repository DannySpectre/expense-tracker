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
import ug from "date-fns/esm/locale/ug/index";

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
      if (userId && amount && description) {
        const { data, error } = await supabase
          .from("income")
          .insert({
            user_id: userId,
            amount: amount,
            description: description,
          })
          .select();
        if (error) throw error;
        console.log("data ", data);
        setAmount("");
        setDescription("");
      }
    } catch {
      console.log(error);
    }
  };

  const addNewExpense = async () => {
    try {
      if (userId && amount && description) {
        const { data, error } = await supabase
          .from("expenses")
          .insert({
            user_id: userId,
            amount: amount,
            description: description,
          })
          .select();
        if (error) throw error;
        console.log("data ", data);
        setAmount("");
        setDescription("");
      }
    } catch {
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
            <div className="mt-6">
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
                      <Input
                        id="income_amount"
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="income_description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={addNewIncome}>Add Income</Button>
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
                      <Input
                        id="expense_amount"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="expense_description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={addNewExpense}>Add Expense</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="flex flex-col items-center mt-6 gap-4">
            <Card className="w-[680px]">
              <CardHeader>
                <CardTitle>Income</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">Income item list</CardContent>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">Expense item list</CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
