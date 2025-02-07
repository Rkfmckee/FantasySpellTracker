﻿// <auto-generated />
using System;
using FantasySpellTracker.DAL.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FantasySpellTracker.DAL.Migrations
{
    [DbContext(typeof(FstDataDbContext))]
    partial class FstDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.Class", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Classes");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.ClassSpell", b =>
                {
                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.Property<int>("SpellId")
                        .HasColumnType("int");

                    b.Property<bool>("Optional")
                        .HasColumnType("bit");

                    b.Property<int?>("SubClassId")
                        .HasColumnType("int");

                    b.HasKey("ClassId", "SpellId");

                    b.HasIndex("SpellId");

                    b.HasIndex("SubClassId");

                    b.ToTable("ClassSpells");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.Source", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Sources");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.Spell", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("AreaType")
                        .HasColumnType("int");

                    b.Property<int?>("AreaValue")
                        .HasColumnType("int");

                    b.Property<int?>("AttackType")
                        .HasColumnType("int");

                    b.Property<int>("CastingTime")
                        .HasColumnType("int");

                    b.Property<string>("CastingTimeDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Components")
                        .HasColumnType("int");

                    b.Property<string>("ComponentsCost")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ComponentsDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Conditions")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("DamageTypes")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<string>("HigherLevelDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsConcentration")
                        .HasColumnType("bit");

                    b.Property<bool>("IsRitual")
                        .HasColumnType("bit");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RangeDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RangeType")
                        .HasColumnType("int");

                    b.Property<int>("RangeValue")
                        .HasColumnType("int");

                    b.Property<int?>("SaveType")
                        .HasColumnType("int");

                    b.Property<int>("School")
                        .HasColumnType("int");

                    b.Property<int?>("SourceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SourceId");

                    b.ToTable("Spells");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.SubClass", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("ClassId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ClassId");

                    b.ToTable("SubClasses");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.ClassSpell", b =>
                {
                    b.HasOne("FantasySpellTracker.DAL.Entities.Class", "Class")
                        .WithMany("ClassSpells")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FantasySpellTracker.DAL.Entities.Spell", "Spell")
                        .WithMany("ClassSpells")
                        .HasForeignKey("SpellId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("FantasySpellTracker.DAL.Entities.SubClass", "SubClass")
                        .WithMany()
                        .HasForeignKey("SubClassId");

                    b.Navigation("Class");

                    b.Navigation("Spell");

                    b.Navigation("SubClass");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.Spell", b =>
                {
                    b.HasOne("FantasySpellTracker.DAL.Entities.Source", "Source")
                        .WithMany("Spells")
                        .HasForeignKey("SourceId");

                    b.Navigation("Source");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.SubClass", b =>
                {
                    b.HasOne("FantasySpellTracker.DAL.Entities.Class", "Class")
                        .WithMany("SubClasses")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Class");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.Class", b =>
                {
                    b.Navigation("ClassSpells");

                    b.Navigation("SubClasses");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.Source", b =>
                {
                    b.Navigation("Spells");
                });

            modelBuilder.Entity("FantasySpellTracker.DAL.Entities.Spell", b =>
                {
                    b.Navigation("ClassSpells");
                });
#pragma warning restore 612, 618
        }
    }
}
